-- Insert missing portfolio sections if they don't exist
INSERT INTO page_sections (page_name, section_name, background_value, order_position, is_active)
SELECT 'portfolio', 'uncharted', '', 1, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page_name = 'portfolio' AND section_name = 'uncharted');

INSERT INTO page_sections (page_name, section_name, background_value, order_position, is_active)
SELECT 'portfolio', 'vox-borders', '', 2, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page_name = 'portfolio' AND section_name = 'vox-borders');

INSERT INTO page_sections (page_name, section_name, background_value, order_position, is_active)
SELECT 'portfolio', 'nyt', '', 3, true
WHERE NOT EXISTS (SELECT 1 FROM page_sections WHERE page_name = 'portfolio' AND section_name = 'nyt');