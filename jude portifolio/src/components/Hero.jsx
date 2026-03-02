import React from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../lib/useCMS";
import blackImg from "../../images/black.webp";
import bracketImg from "../../images/bracket.webp";

export default function Hero() {
  const { content, loading } = useCMS("HomePage.HeroSection");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full py-6 bg-[#e9e4da] text-black overflow-hidden">

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-16 flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* LEFT TEXT CONTENT */}
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 lg:mb-10">
            {content.title}
          </h2>

          <Link to={content.link_url} className="uppercase tracking-widest text-sm font-medium group inline-block">
            {content.link_text}
            <span className="block h-[2px] bg-red-600 w-full mt-3"></span>
          </Link>
        </div>

        {/* RIGHT IMAGE STACK */}
        <div className="relative">

          {/* Black Paper Background */}
          <img
            src={content.black_image || blackImg}
            alt=""
            className="absolute -top-8 w-[350px] h-[420px] object-cover"
          />

          {/* Main Image */}
          <img
            src={content.background_image}
            alt="Journalist"
            className="relative -left-30 ml-8 w-[350px] h-[420px] object-cover"
          />

          {/* Corner Brackets */}
          <img
            src={content.bracket_image || bracketImg}
            alt=""
            className="absolute left-70 top-30 -translate-y-1/2 w-20 h-20 object-contain"
          />

        </div>

      </div>
    </div>
  );
}
