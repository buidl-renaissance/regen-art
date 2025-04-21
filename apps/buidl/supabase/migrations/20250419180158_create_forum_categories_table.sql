-- Create forum categories table
CREATE TABLE forum_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_forum_categories_slug ON forum_categories(slug);

-- Insert some initial categories
INSERT INTO forum_categories (name, slug, description, display_order) VALUES
('General Discussion', 'general-discussion', 'General topics related to the platform', 1),
('Announcements', 'announcements', 'Official announcements and updates', 2),
('Help & Support', 'help-support', 'Get help with using the platform', 3),
('Feature Requests', 'feature-requests', 'Suggest new features and improvements', 4),
('Development', 'development', 'Technical discussions about development', 5);
