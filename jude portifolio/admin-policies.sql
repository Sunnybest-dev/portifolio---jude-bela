-- Run this in Supabase SQL Editor to allow authenticated users to edit

-- Admin policies for authenticated users
CREATE POLICY "Authenticated users can update" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update" ON page_sections FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert" ON page_sections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON page_sections FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read all" ON page_sections FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update" ON portfolio_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert" ON portfolio_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON portfolio_items FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read all" ON portfolio_items FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update" ON faqs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert" ON faqs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON faqs FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read all" ON faqs FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update" ON navigation_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert" ON navigation_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON navigation_items FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read all" ON navigation_items FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update" ON social_links FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert" ON social_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON social_links FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read all" ON social_links FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read" ON newsletter_subscriptions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read" ON research_writer_applications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read" ON editor_animator_applications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
