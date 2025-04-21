-- Create forum tags table
CREATE TABLE forum_tags (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_forum_tags_slug ON forum_tags(slug);

-- Create forum thread tags junction table
CREATE TABLE forum_thread_tags (
  thread_id BIGINT REFERENCES forum_threads(id) ON DELETE CASCADE NOT NULL,
  tag_id BIGINT REFERENCES forum_tags(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (thread_id, tag_id)
);

-- Create indexes for faster lookups
CREATE INDEX idx_forum_thread_tags_thread_id ON forum_thread_tags(thread_id);
CREATE INDEX idx_forum_thread_tags_tag_id ON forum_thread_tags(tag_id);

-- Insert some initial tags
INSERT INTO forum_tags (name, slug, created_at, updated_at) VALUES
('Beginner', 'beginner', NOW(), NOW()),
('Advanced', 'advanced', NOW(), NOW()),
('Tutorial', 'tutorial', NOW(), NOW()),
('Question', 'question', NOW(), NOW()),
('Discussion', 'discussion', NOW(), NOW()),
('Announcement', 'announcement', NOW(), NOW()),
('Feature', 'feature', NOW(), NOW());

-- Insert some initial thread-tag associations
INSERT INTO forum_thread_tags (thread_id, tag_id) VALUES
(1, 6), -- Welcome thread with Announcement tag
(2, 3), -- Getting started with Tutorial tag
(2, 1), -- Getting started with Beginner tag
(3, 6), -- New features with Announcement tag
(3, 7), -- New features with Feature tag
(4, 2), -- Best practices with Advanced tag
(5, 5), -- Project ideas with Discussion tag
(6, 7); -- Dark mode request with Feature tag
