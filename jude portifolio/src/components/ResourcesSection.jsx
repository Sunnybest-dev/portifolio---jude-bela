import React from "react";
import { useCMS } from "../lib/useCMS";
import patreonImg from "../../images/Asset+26.webp";
import assetImg from "../../images/Asset+25 (1).webp";
import newsletterImg from "../../images/Asset+28.webp";
import gearImg from "../../images/Asset+27.webp";

export default function ResourcesSection() {
  const { content, loading } = useCMS("AboutPage.ResourcesSection");

  if (loading) return <div className="w-full h-96 bg-[#d8cec2] animate-pulse"></div>;

  const defaultImages = [patreonImg, assetImg, newsletterImg, gearImg];

  const defaultItems = [
    {
      title: "Patreon",
      description: "Support my Patreon and get behind the scenes of my videos.",
      link_text: "Go To Patreon",
      link_url: "#",
      image: patreonImg
    },
    {
      title: "Bright Trip",
      description: "I started a travel company that teaches you how to travel smarter.",
      link_text: "Visit Bright Trip",
      link_url: "#",
      image: assetImg
    },
    {
      title: "Newsletter",
      description: "We have a monthly non-spammy newsletter with our recommendations and a playlist.",
      link_text: "Join Newsletter",
      link_url: "#",
      image: newsletterImg
    },
    {
      title: "Gear Guide",
      description: "Here is all of the gear we use to make our videos.",
      link_text: "View Gear Guide",
      link_url: "#",
      image: gearImg
    }
  ];

  // Fallback for items if the list is empty or undefined
  const items = (content?.items && content.items.length > 0) ? content.items : defaultItems;

  return (
    <div className="w-full bg-[#d8cec2] py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 font-serifDisplay text-[#1e1e1e]">

      {/* Title */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl font-light">{content.title || "More From Jude"}</h2>
      </div>

      <div className="border-t border-black mb-8 sm:mb-12 lg:mb-16"></div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-start">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 relative group">
            {/* Numbering */}
            <div className="absolute -left-4 -top-4 text-6xl font-bold text-black/5 font-['Vario'] select-none pointer-events-none">
              {index + 1}
            </div>

            <img
              src={item.image || defaultImages[index % defaultImages.length]}
              alt={item.title}
              className="w-full sm:w-[200px] lg:w-[280px] h-[150px] sm:h-[140px] lg:h-[180px] object-cover mx-auto sm:mx-0 z-10"
            />
            <div className="flex-1 text-center sm:text-left z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-3 lg:mb-4">{item.title}</h3>
              <p className="text-base sm:text-lg leading-relaxed mb-4 lg:mb-6 whitespace-pre-line">
                {item.description}
              </p>
              <a href={item.link_url || "#"} className="uppercase text-xs sm:text-sm tracking-wider border-b-2 lg:border-b-3 font-semibold border-white pb-1 inline-block hover:border-black transition-colors">
                {item.link_text}
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
