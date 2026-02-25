import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import FAQs from './pages/FAQs'
import Contact from './pages/Contact'
import ResearchWriter from './pages/ResearchWriter'
import EditorAnimator from './pages/EditorAnimator'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminSettings from './pages/AdminSettings'
import AdminPortfolio from './pages/AdminPortfolio'
import AdminSections from './pages/AdminSections'
import AdminFAQs from './pages/AdminFAQs'
import AdminNavigation from './pages/AdminNavigation'
import AdminSocial from './pages/AdminSocial'
import AdminSubmissions from './pages/AdminSubmissions'

function App() {
  useEffect(() => {
    const updateTitle = async () => {
      const { data } = await supabase.from('site_settings').select('value').eq('key', 'site_title').single();
      if (data) document.title = data.value;
    };
    updateTitle();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/research-writer" element={<ResearchWriter />} />
        <Route path="/editor-animator" element={<EditorAnimator />} />
        <Route path="/submit-ideas" element={<NotFound />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/portfolio" element={<AdminPortfolio />} />
        <Route path="/admin/sections" element={<AdminSections />} />
        <Route path="/admin/faqs" element={<AdminFAQs />} />
        <Route path="/admin/navigation" element={<AdminNavigation />} />
        <Route path="/admin/social" element={<AdminSocial />} />
        <Route path="/admin/submissions" element={<AdminSubmissions />} />
      </Routes>
    </Router>
  )
}

export default App
