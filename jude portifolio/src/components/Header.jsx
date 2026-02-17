import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#e9e4da] text-black">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-4 lg:py-6 flex items-center justify-between">

        {/* Logo Section */}
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide">
            JUDE·BALE
          </h1>
          <div className="h-[2px] lg:h-[3px] bg-red-600 w-full mt-2 lg:mt-3"></div>
        </Link>

        {/* Hamburger Menu Button - Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center"
        >
          <span className={`block h-0.5 w-full bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-6 lg:space-x-12 text-xs lg:text-base tracking-widest uppercase font-medium">
          <Link to="/about" className="hover:border-b-2 hover:border-[#e05532] pb-1 transition">About</Link>
          <Link to="/portfolio" className="hover:border-b-2 hover:border-[#e05532] pb-1 transition">Portfolio</Link>
          <a href="#" className="hover:border-b-2 hover:border-[#e05532] pb-1 transition">FAQs</a>
          <a href="#" className="hover:border-b-2 hover:border-[#e05532] pb-1 transition">Contact</a>
        </nav>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#e9e4da] border-t border-black/10 px-4 py-6">
          <div className="flex flex-col space-y-4 text-sm tracking-widest uppercase font-medium">
            <Link to="/about" className="hover:border-b-2 hover:border-[#e05532] pb-1 transition" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/portfolio" className="hover:border-b-2 hover:border-[#e05532] pb-1 transition" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
            <a href="#" className="hover:border-b-2 hover:border-[#e05532] pb-1 transition" onClick={() => setIsMenuOpen(false)}>FAQs</a>
            <a href="#" className="hover:border-b-2 hover:border-[#e05532] pb-1 transition" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </nav>
      )}
    </header>
  );
}
