-- ============================================
-- DROP ALL EXISTING TABLES
-- Run this FIRST to clean up, then run database-schema.sql
-- ============================================

DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS editor_animator_applications CASCADE;
DROP TABLE IF EXISTS research_writer_applications CASCADE;
DROP TABLE IF EXISTS newsletter_subscriptions CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS navigation_items CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS portfolio_items CASCADE;
DROP TABLE IF EXISTS page_sections CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS hero_content CASCADE;
DROP TABLE IF EXISTS about_content CASCADE;
DROP TABLE IF EXISTS job_listings CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS pages CASCADE;
DROP TABLE IF EXISTS media CASCADE;
