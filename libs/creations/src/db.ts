import knex, { Knex } from 'knex';
import { Creation, CreationStatus, CreationType } from './interfaces';

// Database configuration
let knexInstance: Knex | null = null;

/**
 * Initialize the database connection
 */
export function initDb(config?: Knex.Config): Knex {
  if (!knexInstance) {
    const dbConfig = config || require('../knexfile')[process.env['NODE_ENV'] || 'development'];
    knexInstance = knex(dbConfig);
  }
  return knexInstance;
}

/**
 * Close the database connection
 */
export async function closeDb(): Promise<void> {
  if (knexInstance) {
    await knexInstance.destroy();
    knexInstance = null;
  }
}

/**
 * Get all creations with optional filtering
 */
export async function getCreations(filters?: {
  status?: CreationStatus;
  category?: string;
  type?: CreationType;
  creator?: string;
}): Promise<Creation[]> {
  const db = initDb();
  let query = db('creations').select('*');
  
  if (filters) {
    if (filters.status) query = query.where('status', filters.status);
    if (filters.category) query = query.where('category', filters.category);
    if (filters.type) query = query.where('type', filters.type);
    if (filters.creator) query = query.where('creator', filters.creator);
  }
  
  const results = await query;
  
  return results.map(row => {
    const creation: Creation = {
      id: row.id,
      title: row.title,
      description: row.description,
      slug: row.slug,
      imageUrl: row.image_url,
      category: row.category,
      status: row.status as CreationStatus,
      type: row.type as CreationType,
      location: row.location,
      url: row.url,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      creator: row.creator
    };
    
    // Parse data field if it exists
    if (row.data) {
      const data = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
      if (data.tags) creation.tags = data.tags;
    }
    
    return creation;
  });
}

/**
 * Get a creation by ID
 */
export async function getCreationById(id: string): Promise<Creation | null> {
  const db = initDb();
  const result = await db('creations').where('id', id).first();
  
  if (!result) return null;
  
  const creation: Creation = {
    id: result.id,
    title: result.title,
    description: result.description,
    slug: result.slug,
    imageUrl: result.image_url,
    category: result.category,
    status: result.status as CreationStatus,
    type: result.type as CreationType,
    location: result.location,
    url: result.url,
    createdAt: result.created_at,
    updatedAt: result.updated_at,
    creator: result.creator.handle
  };
  
  // Parse data field if it exists
  if (result.data) {
    const data = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
    if (data.tags) creation.tags = data.tags;
  }
  
  return creation;
}

/**
 * Get a creation by slug
 */
export async function getCreationBySlug(slug: string): Promise<Creation | null> {
  const db = initDb();
  const result = await db('creations').where('slug', slug).first();
  
  if (!result) return null;
  
  return getCreationById(result.id);
}

/**
 * Create a new creation
 */
export async function createCreation(creation: Partial<Creation>): Promise<Creation> {
  const db = initDb();
  
  const data: any = {};
  if (creation.tags) data.tags = creation.tags;
  
  const [id] = await db('creations').insert({
    title: creation.title,
    description: creation.description,
    slug: creation.slug,
    image_url: creation.imageUrl,
    category: creation.category,
    location: creation.location,
    status: creation.status || CreationStatus.DRAFT,
    type: creation.type,
    url: creation.url,
    data: Object.keys(data).length > 0 ? JSON.stringify(data) : null,
    creator: creation.creator || 'system'
  });
  
  return getCreationById(id) as Promise<Creation>;
}

/**
 * Update an existing creation
 */
export async function updateCreation(id: string, updates: Partial<Creation>): Promise<Creation | null> {
  const db = initDb();
  const creation = await getCreationById(id);
  
  if (!creation) return null;
  
  const updateData: any = {};
  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.slug !== undefined) updateData.slug = updates.slug;
  if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl;
  if (updates.category !== undefined) updateData.category = updates.category;
  if (updates.location !== undefined) updateData.location = updates.location;
  if (updates.status !== undefined) updateData.status = updates.status;
  if (updates.type !== undefined) updateData.type = updates.type;
  if (updates.url !== undefined) updateData.url = updates.url;
  
  // Handle data field updates
  const existingData = creation.tags ? { tags: creation.tags } : {};
  if (updates.tags !== undefined) existingData.tags = updates.tags;
  
  if (Object.keys(existingData).length > 0) {
    updateData.data = JSON.stringify(existingData);
  }
  
  await db('creations').where('id', id).update(updateData);
  
  return getCreationById(id);
}

/**
 * Delete a creation
 */
export async function deleteCreation(id: string): Promise<boolean> {
  const db = initDb();
  const deleted = await db('creations').where('id', id).delete();
  return deleted > 0;
}
