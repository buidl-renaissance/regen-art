-- Create forum threads table
CREATE TABLE forum_threads (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  category_id BIGINT REFERENCES forum_categories(id) ON DELETE CASCADE,
  handle TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  num_views INTEGER DEFAULT 0,
  num_posts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slug, category_id)
);

-- Create index for faster lookups
CREATE INDEX idx_forum_threads_category_id ON forum_threads(category_id);
CREATE INDEX idx_forum_threads_slug ON forum_threads(slug);
CREATE INDEX idx_forum_threads_handle ON forum_threads(handle);

-- Insert some initial threads
INSERT INTO forum_threads (title, slug, category_id, handle, is_pinned, created_at, updated_at) VALUES
('Welcome to the Forum', 'welcome-to-the-forum', 2, 'dArt', TRUE, NOW(), NOW()),
('How to get started with the platform', 'how-to-get-started-with-the-platform', 3, 'dArt', TRUE, NOW(), NOW()),
('Introducing new features this month', 'introducing-new-features-this-month', 2, 'dArt', FALSE, NOW(), NOW()),
('Best practices for development', 'best-practices-for-development', 5, 'dArt', FALSE, NOW(), NOW()),
('Share your project ideas', 'share-your-project-ideas', 1, 'dArt', FALSE, NOW(), NOW()),
('Feature request: Dark mode support', 'feature-request-dark-mode-support', 4, 'dArt', FALSE, NOW(), NOW());
