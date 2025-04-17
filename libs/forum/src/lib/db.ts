import { Knex, knex } from 'knex';

// Database configuration
const config: Knex.Config = {
  client: process.env.DB_CLIENT || 'sqlite3',
  connection: process.env.DB_CONNECTION_STRING || {
    filename: process.env.DB_FILENAME || '../../../dev.sqlite3',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
};

// Initialize knex instance
const db = knex(config);

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

export const getThreadBySlug = async (
  threadSlug: string
) => {
  return db('forum_threads')
    .where({
      'forum_threads.slug': threadSlug,
    })
    .select(
      'forum_threads.*'
    )
    .first();
};

export const incrementThreadViews = async (threadId: number) => {
  return db('forum_threads').where({ id: threadId }).increment('views', 1);
};

// Forum posts
export const getPostsByThreadId = async (threadId: number) => {
  return db('forum_posts')
    .where({ thread_id: threadId })
    .orderBy('created_at', 'asc');
};

export const createThread = async (threadData: {
  title: string;
  category_id: number;
  user_id: number;
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
  return db.transaction(async (trx) => {
    // Insert thread
    const [thread] = await trx('forum_threads')
      .insert({
        title: threadData.title,
        slug,
        category_id: threadData.category_id,
        user_id: threadData.user_id,
        created_at: new Date(),
        updated_at: new Date(),
      });

    // Insert first post
    await trx('forum_posts').insert({
      thread_id: thread,
      user_id: threadData.user_id,
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
          const [newTagId] = await trx('forum_tags')
            .insert({
              name: tagName,
              slug: tagSlug,
              created_at: new Date(),
              updated_at: new Date(),
            });

          tagId = newTagId;
        }

        // Associate tag with thread
        await trx('forum_thread_tags').insert({
          thread_id: thread,
          tag_id: tagId,
        });
      }
    }

    return thread;
  });
};

export const createPost = async (postData: {
  thread_id: number;
  user_id: number;
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
