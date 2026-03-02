import React from "react";
import { useCMS } from "../lib/useCMS";

export default function WorkHighlights() {
  const { content, loading } = useCMS("AboutPage.WorkHighlights");

  if (loading) return <div className="w-full h-32 bg-[#1f1f1f] animate-pulse"></div>;

  const defaultItems = [
    { text: "Vox Borders Series", url: "https://www.youtube.com/playlist?list=PLJ8cMiYb3G5dRe4rC7m8jDaqodjZeLzCZ" },
    { text: "The New York Times", url: "https://www.nytimes.com" },
    { text: "Jude's Channel", url: "https://www.youtube.com/channel/UCmGSJVG3mCRXVOP4yZrU1Dw" }
  ];

  const items = content?.items || defaultItems;

  return (
    <div className="w-full bg-[#1f1f1f] py-8 sm:py-10" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 lg:gap-32 px-6">
        {items.map((item, index) => (
          <a 
            key={index}
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group hover:opacity-80 transition-opacity"
          >
            <span className="text-white text-xs sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase font-medium text-center">
              {item.text}
            </span>
            <div className="w-[140px] sm:w-[180px] h-[2px] bg-[#e4572e] mt-2 sm:mt-3"></div>
          </a>
        ))}
      </div>
    </div>
  );
}
