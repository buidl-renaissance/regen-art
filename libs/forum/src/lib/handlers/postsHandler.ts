import { Request, Response } from 'express';
import { createPost, getThreadBySlug } from '../db';

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    const { thread_id, user_id, content } = req.body;
    
    if (!thread_id || !user_id || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const postId = await createPost({
      thread_id,
      user_id,
      content
    });
    
    return res.status(201).json({ id: postId });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};

export const getPostsHandler = async (req: Request, res: Response) => {
  try {
    const { threadSlug } = req.params;
    const thread = await getThreadBySlug(threadSlug);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    // Posts are included in the thread data from getThreadBySlug
    return res.status(200).json(thread.posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
};
