import { Knex, knex } from 'knex';

// Database configuration
const config: Knex.Config = {
  client: process.env.DB_CLIENT || 'sqlite3',
  connection: process.env.DB_CONNECTION_STRING || {
    filename: process.env.DB_FORUM_FILENAME || '../../../dev-forum.sqlite3',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
};

// Initialize knex instance
const db = knex(config);

// Helper function to format dates as strings
export const formatDate = (date: Date | string | null): string | null => {
  if (!date) return null;
  return new Date(date).toISOString();
};

// Ensure dates are returned as strings in query results
db.on('query-response', (response, query) => {
  if (Array.isArray(response)) {
    response.forEach(row => {
      Object.keys(row).forEach(key => {
        if (row[key] instanceof Date) {
          row[key] = formatDate(row[key]);
        }
      });
    });
  } else if (response && typeof response === 'object') {
    Object.keys(response).forEach(key => {
      if (response[key] instanceof Date) {
        response[key] = formatDate(response[key]);
      }
    });
  }
});

// Forum categories
export const getCategories = async () => {
  return db('forum_categories').orderBy('display_order');
};

export const getCategoryBySlug = async (slug: string) => {
  return db('forum_categories').where({ slug }).first();
};

// Forum threads
export const getThreads = async (
  options: {
    categoryId?: number;
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  } = {}
) => {
  const query = db('forum_threads')
    .leftJoin('forum_posts', function () {
      this.on('forum_threads.id', '=', 'forum_posts.thread_id').andOn(
        'forum_posts.is_first_post',
        '=',
        db.raw('?', [true])
      );
    })
    .select(
      'forum_threads.*',
      'forum_posts.content as first_post_content'
    );

  if (options.categoryId) {
    query.join(
      'forum_categories',
      'forum_threads.category_id',
      'forum_categories.id'
    )
    query.where('forum_threads.category_id', options.categoryId);
  }

  if (options.orderBy) {
    query.orderBy(
      `forum_threads.${options.orderBy}`,
      options.orderDirection || 'desc'
    );
  } else {
    query.orderBy('forum_threads.created_at', 'desc');
  }

  if (options.limit) {
    query.limit(options.limit);
  }

  if (options.offset) {
    query.offset(options.offset);
  }

  return query;
};

export const getThreadById = async (
  threadId: number
) => {
  const thread = await db('forum_threads')
    .where({
      'forum_threads.id': threadId,
    })
    .select(
      'forum_threads.*'
    )
    .first();
  
  if (thread) {
    // Get posts for this thread
    const posts = await db('forum_posts')
      .where({ thread_id: threadId })
      .orderBy('created_at', 'asc');
    
    // Get category information
    const category = await db('forum_categories')
      .where({ id: thread.category_id })
      .first();
    
    // Get tags for this thread
    const tags = await db('forum_thread_tags')
      .join('forum_tags', 'forum_thread_tags.tag_id', 'forum_tags.id')
      .where({ thread_id: threadId })
      .select('forum_tags.name');
    
    return {
      ...thread,
      posts,
      category,
      tags: tags.map(tag => tag.name),
      num_replies: posts.length - 1,
      num_views: thread.num_views || 0,
    };
  }
  
  return thread;
};

export const getThreadBySlug = async (
  threadSlug: string
) => {
  const thread = await db('forum_threads')
    .where({
      'forum_threads.slug': threadSlug,
    })
    .select(
      'forum_threads.*'
    )
    .first();
  
  if (thread) {
    // Get posts for this thread
    const posts = await db('forum_posts')
      .where({ thread_id: thread.id })
      .orderBy('created_at', 'asc');
    
    // Get category information
    const category = await db('forum_categories')
      .where({ id: thread.category_id })
      .first();
    
    // Get tags for this thread
    const tags = await db('forum_thread_tags')
      .join('forum_tags', 'forum_thread_tags.tag_id', 'forum_tags.id')
      .where({ thread_id: thread.id })
      .select('forum_tags.name');
    
    return {
      ...thread,
      posts,
      category,
      tags: tags.map(tag => tag.name),
      num_replies: posts.length - 1,
      num_views: thread.num_views || 0,
    };
  }
  
  return thread;
};

export const incrementThreadViews = async (threadId: number) => {
  return db('forum_threads').where({ id: threadId }).increment('num_views', 1);
};

// Forum posts
export const getPostsByThreadId = async (threadId: number) => {
  return db('forum_posts')
    .where({ thread_id: threadId })
    .orderBy('created_at', 'asc');
};

export const createThread = async (threadData: {
  title: string;
  category_id: string;
  handle: string;
  content: string;
  tags?: string[];
}) => {
  // Generate slug from title
  const slug = threadData.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);

  // Start a transaction
  const threadId = await db.transaction(async (trx) => {
    // Insert thread

    console.log("THREAD DATA: ", {
      title: threadData.title,
      slug,
      category_id: threadData.category_id,
      handle: threadData.handle,
      created_at: new Date(),
      updated_at: new Date(),
    });
    
    // Fix: Ensure we're properly handling the returned value based on the database client
    let threadId;
    
    if (process.env.DB_CLIENT === 'sqlite3') {
      // SQLite returns the last inserted ID
      threadId = await trx('forum_threads')
        .insert({
          title: threadData.title,
          slug,
          category_id: threadData.category_id,
          handle: threadData.handle,
          created_at: new Date(),
          updated_at: new Date(),
        });
    } else {
      // For other databases like MySQL or PostgreSQL that support returning
      const result = await trx('forum_threads')
        .insert({
          title: threadData.title,
          slug,
          category_id: threadData.category_id,
          handle: threadData.handle,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning('id');
      
      threadId = result[0].id || result[0];
    }

    // Insert first post
    await trx('forum_posts').insert({
      thread_id: threadId,
      handle: threadData.handle,
      content: threadData.content,
      is_first_post: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Handle tags if provided
    if (threadData.tags && threadData.tags.length > 0) {
      // Process each tag
      for (const tagName of threadData.tags) {
        // Check if tag exists or create it
        let tagId;
        const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');

        const existingTag = await trx('forum_tags')
          .where({ slug: tagSlug })
          .first();

        if (existingTag) {
          tagId = existingTag.id;
        } else {
          // Handle tag insertion based on database client
          if (process.env.DB_CLIENT === 'sqlite3') {
            tagId = await trx('forum_tags')
              .insert({
                name: tagName,
                slug: tagSlug,
                created_at: new Date(),
                updated_at: new Date(),
              });
          } else {
            const result = await trx('forum_tags')
              .insert({
                name: tagName,
                slug: tagSlug,
                created_at: new Date(),
                updated_at: new Date(),
              })
              .returning('id');
            
            tagId = result[0].id || result[0];
          }
        }

        // Associate tag with thread - check for duplicates first
        const existingThreadTag = await trx('forum_thread_tags')
          .where({ thread_id: threadId, tag_id: tagId })
          .first();
          
        if (!existingThreadTag) {
          await trx('forum_thread_tags').insert({
            thread_id: threadId,
            tag_id: tagId,
          });
        }
      }
    }

    return threadId;
  });

  return getThreadById(threadId);
};

export const createPost = async (postData: {
  thread_id: number;
  handle: number;
  content: string;
}) => {
  const [postId] = await db('forum_posts')
    .insert({
      ...postData,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning('id');

  // Update thread's updated_at timestamp
  await db('forum_threads')
    .where({ id: postData.thread_id })
    .update({ updated_at: new Date() });

  return postId;
};

// Tags
export const getThreadTags = async (threadId: number) => {
  return db('forum_tags')
    .join('forum_thread_tags', 'forum_tags.id', 'forum_thread_tags.tag_id')
    .where('forum_thread_tags.thread_id', threadId)
    .select('forum_tags.*');
};

export const getPopularTags = async (limit = 10) => {
  return db('forum_tags')
    .join('forum_thread_tags', 'forum_tags.id', 'forum_thread_tags.tag_id')
    .groupBy('forum_tags.id')
    .orderBy('thread_count', 'desc')
    .limit(limit)
    .select(
      'forum_tags.*',
      db.raw('COUNT(forum_thread_tags.thread_id) as thread_count')
    );
};

export default db;
