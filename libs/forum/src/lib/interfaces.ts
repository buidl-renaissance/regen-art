export interface ForumThread {
  id: number | string;
  slug: string;
  title: string;
  handle: string;
  date: string;
  preview: string;
  category: string;
  num_replies: number;
  num_views: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export interface ForumPost {
  id: string;
  title: string;
  handle: string;
  date: string;
  content: string;
  category: string;
  tags: string[];
  is_first_post: boolean;
  num_views: number;
  num_likes: number;
  replies: ForumReply[];
  created_at: string;
  updated_at: string;
}

export interface ForumReply {
  id: string;
  handle: string;
  date: string;
  content: string;
  num_likes: number;
  created_at: string;
  updated_at: string;
}

export interface ForumCategory {
  id: string | number;
  name: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
  threads: number;
  posts: number;
  created_at: string;
  updated_at: string;
}
