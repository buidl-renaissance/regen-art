-- Create creators table
CREATE TABLE creators (
  id BIGSERIAL PRIMARY KEY,
  handle TEXT NOT NULL UNIQUE,
  name TEXT,
  bio TEXT,
  profile_image TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}'::JSONB,
  data JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_creators_handle ON creators(handle);

-- Create index for JSON social links
CREATE INDEX idx_creators_social_links ON creators USING GIN (social_links);

-- Insert some initial creators for testing
INSERT INTO creators (handle, name, bio, profile_image, website, social_links, created_at, updated_at) VALUES
('artmaster', 'Art Master', 'Digital artist specializing in abstract art and landscapes', 'https://example.com/profiles/artmaster.jpg', 'https://artmaster.com', 
  '{"twitter": "artmaster", "instagram": "artmaster", "github": "artmaster"}'::JSONB, 
  NOW(), NOW()),
('designguru', 'Design Guru', 'UI/UX designer with a passion for minimalist design', 'https://example.com/profiles/designguru.jpg', 'https://designguru.io', 
  '{"twitter": "designguru", "linkedin": "https://linkedin.com/in/designguru"}'::JSONB, 
  NOW(), NOW()),
('creativeminds', 'Creative Minds', 'Collaborative art studio focusing on mixed media', 'https://example.com/profiles/creativeminds.jpg', 'https://creativeminds.art', 
  '{"instagram": "creativeminds"}'::JSONB, 
  NOW(), NOW());

