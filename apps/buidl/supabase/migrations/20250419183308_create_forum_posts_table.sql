-- Create forum posts table
CREATE TABLE forum_posts (
  id BIGSERIAL PRIMARY KEY,
  thread_id BIGINT REFERENCES forum_threads(id) ON DELETE CASCADE NOT NULL,
  handle TEXT NOT NULL,
  content TEXT NOT NULL,
  is_first_post BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_forum_posts_thread_id ON forum_posts(thread_id);
CREATE INDEX idx_forum_posts_handle ON forum_posts(handle);
CREATE INDEX idx_forum_posts_is_first_post ON forum_posts(is_first_post);

-- Insert some initial posts for the sample threads
INSERT INTO forum_posts (thread_id, handle, content, is_first_post, created_at, updated_at) VALUES
(1, 'dArt', 'Welcome to our new forum! This is a place for our community to discuss ideas, share knowledge, and help each other.', TRUE, NOW(), NOW()),
(2, 'dArt', 'This guide will help you get started with the platform. First, make sure to complete your profile and explore the different sections available.', TRUE, NOW(), NOW()),
(3, 'dArt', 'We''re excited to announce several new features this month including improved search functionality and enhanced user profiles.', TRUE, NOW(), NOW()),
(4, 'dArt', 'In this thread, we''ll discuss best practices for development on our platform. Feel free to share your own tips and experiences.', TRUE, NOW(), NOW()),
(5, 'dArt', 'Have an interesting project idea? Share it here and get feedback from the community!', TRUE, NOW(), NOW()),
(6, 'dArt', 'I think adding a dark mode option would greatly improve the user experience, especially for those who work at night.', TRUE, NOW(), NOW());
