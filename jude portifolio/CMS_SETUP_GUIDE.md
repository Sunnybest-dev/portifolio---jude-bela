# Complete CMS Backend Setup Guide

## Overview
Your portfolio is now a full CMS where EVERYTHING can be edited from Supabase backend:
- All text content
- Images and media
- Links and URLs
- Colors and styling
- Navigation menus
- Portfolio items
- FAQs
- Job listings
- Social media links
- Form submissions

## Setup Steps

### 1. Run the CMS Schema
1. Go to Supabase Dashboard > SQL Editor
2. Copy and paste `supabase-cms-schema.sql`
3. Click "Run" to create all tables and seed data

### 2. What You Can Edit

#### Site Settings Table
Edit global settings like:
- Site title
- Logo URL
- Brand colors (primary, secondary, background)
- Footer text
- Contact emails
- YouTube channel URL

#### Hero Content Table
Edit homepage hero section:
- Title text
- Subtitle
- Button text and link
- Background color
- Hero image

#### Portfolio Items Table
Manage all portfolio videos/projects:
- Title and description
- Category (Series, Channel, Collaboration)
- Thumbnail image URL
- YouTube video URL
- Order position
- Featured status

#### Navigation Items Table
Edit header menu:
- Menu labels
- URLs
- Order
- Active/inactive status

#### Social Links Table
Manage footer social links:
- Platform name
- URL
- Order
- Active/inactive status

#### FAQs Table
Add/edit FAQ items:
- Question
- Answer
- Category
- Order

#### Job Listings Table
Manage job postings:
- Title
- Description
- Requirements
- Application URL

#### About Content Table
Edit about page sections:
- Section headings
- Body text
- Images
- Links
- Background colors

#### Pages Table
Create dynamic pages:
- Custom slug
- Title and meta description
- Content
- Publish status

#### Media Library Table
Track all uploaded media:
- Filename and URL
- Alt text and captions
- File metadata

### 3. How to Use

#### Example: Change Site Title
```sql
UPDATE site_settings 
SET value = 'New Title Here' 
WHERE key = 'site_title';
```

#### Example: Add Portfolio Item
```sql
INSERT INTO portfolio_items (title, description, category, thumbnail_url, youtube_url, order_position, is_active)
VALUES ('New Video', 'Description here', 'Channel', '/images/thumb.jpg', 'https://youtube.com/...', 6, true);
```

#### Example: Edit Hero Text
```sql
UPDATE hero_content 
SET title = 'New Hero Title', 
    button_text = 'New Button Text'
WHERE is_active = true;
```

#### Example: Add FAQ
```sql
INSERT INTO faqs (question, answer, order_position, is_active)
VALUES ('New question?', 'Answer here', 10, true);
```

### 4. Using CMS in Components

Import the hooks:
```javascript
import { useSiteSettings, usePortfolioItems, useFAQs } from '../lib/useCMS';
```

Use in component:
```javascript
function MyComponent() {
  const { settings, loading } = useSiteSettings();
  const { items } = usePortfolioItems();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{settings.site_title}</h1>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

### 5. Available Hooks

- `useSiteSettings()` - Global site settings
- `useHeroContent()` - Hero section content
- `usePortfolioItems(category)` - Portfolio items (optional category filter)
- `useFAQs()` - FAQ items
- `useNavigation()` - Navigation menu items
- `useSocialLinks()` - Social media links
- `useAboutContent()` - About page sections
- `useJobListings()` - Job postings

### 6. Admin Access

To manage content:
1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Select any table
4. Click "Insert row" or edit existing rows
5. Changes appear instantly on your site

### 7. Image Management

For images:
1. Upload to Supabase Storage or external CDN
2. Copy the public URL
3. Paste URL in the appropriate table field
4. Images will load from that URL

### 8. Benefits

✅ No code changes needed to update content
✅ Non-technical users can manage site
✅ Version control through database
✅ Easy to backup and restore
✅ Real-time updates
✅ Scalable and maintainable

## Next Steps

1. Run `supabase-cms-schema.sql` in Supabase
2. Verify seed data loaded correctly
3. Update components to use CMS hooks
4. Test editing content from Supabase dashboard
5. Train content managers on how to use it

Your portfolio is now a professional CMS! 🎉
