import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#e9e4da] text-black">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-4 lg:py-6 flex items-center justify-between">

        {/* Logo Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide">
            JUDE·BALE
          </h1>
          <div className="h-[2px] lg:h-[3px] bg-red-600 w-full mt-2 lg:mt-3"></div>
        </div>

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
        <nav className="hidden md:flex space-x-6 lg:space-x-12 text-sm lg:text-lg tracking-widest uppercase font-medium">
          <a href="#" className="hover:opacity-70 transition">About</a>
          <a href="#" className="hover:opacity-70 transition">Portfolio</a>
          <a href="#" className="hover:opacity-70 transition">FAQs</a>
          <a href="#" className="hover:opacity-70 transition">Contact</a>
        </nav>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#e9e4da] border-t border-black/10 px-4 py-6">
          <div className="flex flex-col space-y-4 text-base tracking-widest uppercase font-medium">
            <a href="#" className="hover:opacity-70 transition" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#" className="hover:opacity-70 transition" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
            <a href="#" className="hover:opacity-70 transition" onClick={() => setIsMenuOpen(false)}>FAQs</a>
            <a href="#" className="hover:opacity-70 transition" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </nav>
      )}
    </header>
  );
}
