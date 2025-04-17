'use server';

import { Knex } from 'knex';
import knex from 'knex';
import { Creation, CreationStatus, CreationType, Creator } from '@gods.work/create';


// Database configuration
const config: Knex.Config = {
    client: process.env['DB_CLIENT'] || 'sqlite3',
    connection: process.env['DB_CONNECTION_STRING'] || {
      filename: process.env['DB_FILENAME'] || '../../../tmp/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    }
  };

  
export class CreateClient {
  private readonly knex: Knex;

  constructor(knexInstance?: Knex) {
    // Check if we're running on the client side
    if (typeof window !== 'undefined') {
      throw new Error('CreateClient is a server-side only class and cannot be used in the browser');
    }

    
    if (knexInstance) {
      this.knex = knexInstance;
    } else {
      this.knex = knex(config);
    }
  }

  // Creator methods
  async getCreator(handle: string): Promise<Creator | null> {
    const creator = await this.knex('creators').where({ handle }).first();
    if (!creator) return null;
    
    return {
      ...creator,
      social: creator.social ? JSON.parse(creator.social) : undefined
    };
  }

  async createCreator(creator: Creator): Promise<Creator> {
    const socialJson = creator.social ? JSON.stringify(creator.social) : null;
    
    await this.knex('creators').insert({
      ...creator,
      social: socialJson
    });
    
    return creator;
  }

  // Creation methods
  async getCreation(id: string): Promise<Creation | null> {
    const creation = await this.knex('creations').where({ id }).first();
    if (!creation) return null;
    
    return {
      ...creation,
      tags: creation.tags || [],
      status: creation.status as CreationStatus,
      type: creation.type as CreationType
    };
  }

  async getCreationBySlug(slug: string): Promise<Creation | null> {
    const creation = await this.knex('creations').where({ slug }).first();
    if (!creation) return null;
    
    return {
      ...creation,
      tags: creation.tags || [],
      status: creation.status as CreationStatus,
      type: creation.type as CreationType
    };
  }

  async listCreations(options: {
    status?: CreationStatus;
    type?: CreationType;
    category?: string;
    creatorHandle?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Creation[]> {
    const query = this.knex('creations');
    
    if (options.status) {
      query.where('status', options.status);
    }
    
    if (options.type) {
      query.where('type', options.type);
    }
    
    if (options.category) {
      query.where('category', options.category);
    }
    
    if (options.creatorHandle) {
      query.where('creator_handle', options.creatorHandle);
    }
    
    if (options.limit) {
      query.limit(options.limit);
    }
    
    if (options.offset) {
      query.offset(options.offset);
    }
    
    const creations = await query.orderBy('created_at', 'desc');
    
    return creations.map(creation => ({
      ...creation,
      tags: creation.tags ? JSON.parse(creation.tags) : [],
      status: creation.status as CreationStatus,
      type: creation.type as CreationType
    }));
  }

  async createCreation(creation: Omit<Creation, 'id'>): Promise<Creation> {
    const [id] = await this.knex('creations').insert({
      ...creation,
      tags: Array.isArray(creation.tags) ? JSON.stringify(creation.tags) : null
    }).returning('id');
    
    return this.getCreation(id) as Promise<Creation>;
  }

  async updateCreation(id: string, updates: Partial<Creation>): Promise<Creation | null> {
    const updateData = { ...updates };
    
    if (updates.tags) {
      updateData.tags = JSON.stringify(updates.tags);
    }
    
    await this.knex('creations')
      .where({ id })
      .update(updateData);
    
    return this.getCreation(id);
  }

  async deleteCreation(id: string): Promise<boolean> {
    const deleted = await this.knex('creations')
      .where({ id })
      .delete();
    
    return deleted > 0;
  }
}
