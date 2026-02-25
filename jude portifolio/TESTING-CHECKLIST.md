# SITE FUNCTIONALITY CHECKLIST

## 🔐 PREREQUISITES
- [ ] Run `database-schema.sql` in Supabase SQL Editor
- [ ] Run `admin-policies.sql` in Supabase SQL Editor
- [ ] Create admin user in Supabase Authentication (email: Demike154@gmail.com)
- [ ] Verify .env has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- [ ] Run `npm install` and `npm run dev`

## 📄 FRONTEND PAGES
- [ ] **Home (/)** - Hero, PresetSection, Newsletter, SubmitIdeas sections display
- [ ] **About (/about)** - About page loads
- [ ] **Portfolio (/portfolio)** - Shows portfolio items from database
- [ ] **FAQs (/faqs)** - Shows FAQs from database with accordion
- [ ] **Contact (/contact)** - Shows contact emails from database + form
- [ ] **Research Writer (/research-writer)** - Application form submits
- [ ] **Editor Animator (/editor-animator)** - Application form submits
- [ ] **404 (/any-invalid-url)** - NotFound page displays

## 🎨 FRONTEND COMPONENTS
- [ ] **Header** - Logo, navigation from database, mobile menu works
- [ ] **Footer** - Social links from database, grid background
- [ ] **Newsletter Form** - Submits email to database
- [ ] **Contact Form** - Submits to contact_submissions table

## 🔧 ADMIN PAGES
- [ ] **Login (/admin/login)** - Email/password authentication works
- [ ] **Dashboard (/admin/dashboard)** - Stats display, quick action buttons work
- [ ] **Settings (/admin/settings)** - Edit site_settings, save button works
- [ ] **Portfolio (/admin/portfolio)** - Add/Edit/Delete portfolio items
- [ ] **Sections (/admin/sections)** - Add/Edit/Delete page sections
- [ ] **FAQs (/admin/faqs)** - Add/Edit/Delete FAQs
- [ ] **Navigation (/admin/navigation)** - Add/Edit/Delete nav items
- [ ] **Social (/admin/social)** - Add/Edit/Delete social links
- [ ] **Submissions (/admin/submissions)** - View all form submissions

## 🔄 DATABASE TO FRONTEND FLOW
- [ ] Add portfolio item in admin → Appears on /portfolio
- [ ] Add FAQ in admin → Appears on /faqs
- [ ] Add navigation item in admin → Appears in Header
- [ ] Add social link in admin → Appears in Footer
- [ ] Change site title in admin → Browser title updates
- [ ] Change contact emails in admin → Contact page updates
- [ ] Submit newsletter → Appears in admin submissions
- [ ] Submit contact form → Appears in admin submissions
- [ ] Submit research writer form → Appears in admin submissions
- [ ] Submit editor animator form → Appears in admin submissions

## 🎨 STYLING & RESPONSIVENESS
- [ ] Orange (#e05532) brand color appears throughout
- [ ] Teal (#7f9696) secondary color used
- [ ] Beige (#e9e4da) backgrounds
- [ ] Fonts: Inter, Poppins, DM Sans, Caveat, Cormorant Garamond load
- [ ] Mobile responsive (test at 375px, 768px, 1024px widths)
- [ ] Admin sidebar dark theme with gradient
- [ ] Save buttons have orange background and are visible

## 🔒 SECURITY & PERMISSIONS
- [ ] Unauthenticated users can read public content
- [ ] Unauthenticated users can submit forms
- [ ] Authenticated users can edit all content
- [ ] Admin routes redirect to login if not authenticated
- [ ] Logout button works

## 🐛 COMMON ISSUES TO CHECK
- [ ] No console errors in browser
- [ ] Images load correctly (check /images/ folder)
- [ ] Forms show success/error messages
- [ ] Data persists after page refresh
- [ ] Admin changes reflect immediately on frontend (may need refresh)
- [ ] All save buttons are visible with orange background

## ✅ FINAL VERIFICATION
Test this flow:
1. Login to admin
2. Add a portfolio item with title "Test Item"
3. Go to /portfolio
4. Verify "Test Item" appears
5. Go back to admin and delete it
6. Refresh /portfolio
7. Verify "Test Item" is gone

If all steps work, the site is fully functional!
