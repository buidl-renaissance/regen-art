export interface ForumThread {
  id: number | string;
  slug: string;
  title: string;
  author: string;
  date: string;
  preview: string;
  category: string;
  replies: number;
  views: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  likes: number;
}

export interface ForumCategory {
  id: string | number;
  name: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
  threads: number;
  posts: number;
}
