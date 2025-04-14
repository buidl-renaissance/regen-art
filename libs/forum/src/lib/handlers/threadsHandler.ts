import { Request, Response } from 'express';
import { getThreads, getThreadBySlug, createThread, getCategoryBySlug } from '../db';

export const getThreadsHandler = async (req: Request, res: Response) => {
  try {
    const { 
      categorySlug, 
      limit = 20, 
      offset = 0, 
      orderBy = 'created_at', 
      orderDirection = 'desc' 
    } = req.query;

    let categoryId;
    if (categorySlug) {
      const category = await getCategoryBySlug(categorySlug as string);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      categoryId = category.id;
    }

    const threads = await getThreads({
      categoryId,
      limit: Number(limit),
      offset: Number(offset),
      orderBy: orderBy as string,
      orderDirection: orderDirection as 'asc' | 'desc'
    });

    return res.status(200).json(threads);
  } catch (error) {
    console.error('Error fetching threads:', error);
    return res.status(500).json({ error: 'Failed to fetch threads' });
  }
};

export const getThreadHandler = async (req: Request, res: Response) => {
  try {
    const { threadSlug } = req.params;
    const thread = await getThreadBySlug(threadSlug);
    
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    
    return res.status(200).json(thread);
  } catch (error) {
    console.error('Error fetching thread:', error);
    return res.status(500).json({ error: 'Failed to fetch thread' });
  }
};

export const createThreadHandler = async (req: Request, res: Response) => {
  try {
    const { title, content, category_id, user_id, tags } = req.body;
    
    if (!title || !content || !category_id || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const threadId = await createThread({
      title,
      content,
      category_id,
      user_id,
      tags
    });
    
    return res.status(201).json({ id: threadId });
  } catch (error) {
    console.error('Error creating thread:', error);
    return res.status(500).json({ error: 'Failed to create thread' });
  }
};
