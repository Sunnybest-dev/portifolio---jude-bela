-- ============================================
-- COMPLETE DATABASE SCHEMA - JUDE BELA PORTFOLIO
-- Single file for all tables, policies, and seed data
-- ============================================

-- Site Settings (Global configuration)
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page Sections (Reusable sections with backgrounds)
CREATE TABLE page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL,
  section_name VARCHAR(100) NOT NULL,
  heading TEXT,
  subheading TEXT,
  body_text TEXT,
  button_text VARCHAR(100),
  button_link VARCHAR(255),
  background_type VARCHAR(20) DEFAULT 'color',
  background_value TEXT,
  text_color VARCHAR(50),
  image_url TEXT,
  order_position INTEGER,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Items
CREATE TABLE portfolio_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  thumbnail_url TEXT NOT NULL,
  youtube_url TEXT,
  order_position INTEGER,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  order_position INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Navigation Items
CREATE TABLE navigation_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  url VARCHAR(255) NOT NULL,
  order_position INTEGER,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Links
CREATE TABLE social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  order_position INTEGER,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscriptions
CREATE TABLE newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research Writer Applications
CREATE TABLE research_writer_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  pronouns VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  social_handles TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  portfolio_url TEXT NOT NULL,
  work_examples TEXT NOT NULL,
  about_yourself TEXT NOT NULL,
  subject_matter TEXT NOT NULL,
  available_now BOOLEAN NOT NULL,
  available_date DATE,
  monthly_availability TEXT NOT NULL,
  years_experience VARCHAR(50) NOT NULL,
  additional_info TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Editor Animator Applications
CREATE TABLE editor_animator_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  pronouns VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  social_handles TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  editing_work_examples TEXT NOT NULL,
  animation_work_examples TEXT,
  about_yourself TEXT NOT NULL,
  illustrator_skill INTEGER NOT NULL CHECK (illustrator_skill BETWEEN 1 AND 5),
  premiere_skill INTEGER NOT NULL CHECK (premiere_skill BETWEEN 1 AND 5),
  aftereffects_skill INTEGER NOT NULL CHECK (aftereffects_skill BETWEEN 1 AND 5),
  available_now BOOLEAN NOT NULL,
  available_date DATE,
  monthly_availability TEXT NOT NULL,
  years_experience VARCHAR(50) NOT NULL,
  additional_info TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_writer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE editor_animator_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read" ON page_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Public read" ON portfolio_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public read" ON navigation_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read" ON social_links FOR SELECT USING (is_active = true);
CREATE POLICY "Public insert" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON research_writer_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON editor_animator_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON contact_submissions FOR INSERT WITH CHECK (true);

-- ============================================
-- SEED DATA
-- ============================================

-- Site Settings
INSERT INTO site_settings (key, value, description) VALUES
('site_title', 'Jude Bela | Journalist Based in Washington DC', 'Browser title'),
('site_logo_url', '/favicon.png', 'Logo image'),
('primary_color', '#e05532', 'Orange brand color'),
('secondary_color', '#7f9696', 'Teal brand color'),
('background_color', '#e9e4da', 'Beige background'),
('youtube_channel', 'https://www.youtube.com/@judebela', 'YouTube channel'),
('contact_email_business', 'REBECCA.BIBB@UNITEDTALENT.COM', 'Business email'),
('contact_email_journalism', 'PASKINM@UNITEDTALENT.COM', 'Journalism email');

-- Page Sections
INSERT INTO page_sections (page_name, section_name, heading, button_text, button_link, background_type, background_value, order_position, is_active) VALUES
('home', 'hero', 'Journalist based in Washington DC.', 'MORE ABOUT JUDE', '/about', 'color', '#e9e4da', 1, true),
('home', 'preset', 'I made custom presets and LUTs.', null, null, 'color', '#7f9696', 2, true),
('home', 'newsletter', 'We have a monthly, non-spammy newsletter with our recommendations and a playlist.', null, null, 'color', '#e7dfd2', 3, true),
('home', 'submit_ideas', 'Have an idea for a story?', 'SUBMIT IDEAS', '/submit-ideas', 'color', '#000000', 4, true),
('contact', 'hero', 'CONTACT', null, null, 'image', '/images/map.jpg', 1, true),
('about', 'hero', 'About Jude Bela', null, null, 'color', '#d8cec2', 1, true),
('portfolio', 'hero', 'Portfolio', null, null, 'color', '#7f8b7c', 1, true);

-- Navigation
INSERT INTO navigation_items (label, url, order_position, is_active) VALUES
('About', '/about', 1, true),
('Portfolio', '/portfolio', 2, true),
('FAQs', '/faqs', 3, true),
('Contact', '/contact', 4, true);

-- Social Links
INSERT INTO social_links (platform, url, order_position, is_active) VALUES
('YOUTUBE', 'https://youtube.com', 1, true),
('TIKTOK', 'https://tiktok.com', 2, true),
('PATREON', 'https://patreon.com', 3, true),
('FACEBOOK', 'https://facebook.com', 4, true),
('INSTAGRAM', 'https://instagram.com', 5, true),
('TWITTER', 'https://twitter.com', 6, true);

-- Portfolio Items
INSERT INTO portfolio_items (title, description, category, thumbnail_url, youtube_url, order_position, is_active) VALUES
('Uncharted Series', 'Cyprus exploration', 'Series', '/images/thumb.webp', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1, true),
('Vox Borders Series', 'Border stories', 'Series', '/images/Vox+Borders.webp', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 2, true),
('The New York Times', 'NYT collaboration', 'Collaboration', '/images/screen.webp', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 3, true),
('McDonald''s Ice Cream', 'Channel video', 'Channel', '/images/McDonalds+video.webp', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 4, true),
('Taiwan Invasion', 'Channel video', 'Channel', '/images/maxresdefault.webp', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 5, true);
