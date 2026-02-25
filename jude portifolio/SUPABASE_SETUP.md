# Supabase Backend Setup

## Steps to Setup:

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Sign up for a free account
   - Create a new project

2. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy the `Project URL` and `anon public` key
   - Update `.env` file with your credentials:
     ```
     VITE_SUPABASE_URL=your_project_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     ```

3. **Create Database Tables**
   - Go to SQL Editor in Supabase Dashboard
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL script

4. **Tables Created:**
   - `newsletter_subscriptions` - Stores email subscriptions
   - `research_writer_applications` - Stores researcher/writer applications
   - `editor_animator_applications` - Stores editor/animator applications
   - `contact_submissions` - Stores contact form submissions

5. **Security:**
   - Row Level Security (RLS) is enabled on all tables
   - Public insert policies allow form submissions
   - Only authenticated users can read data (configure in Supabase dashboard)

## Testing:
- Restart your dev server after updating `.env`
- Forms will now save data to Supabase
- Check Supabase Dashboard > Table Editor to view submissions
