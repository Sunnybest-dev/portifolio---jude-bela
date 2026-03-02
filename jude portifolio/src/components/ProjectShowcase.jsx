import React from "react";
import { useCMS } from "../lib/useCMS";
import youtubeImg from "../../images/youtube.webp";
import arrow3Img from "../../images/arrow 3.webp";
import asset25Img from "../../images/Asset+25.webp";

export default function ProjectShowcase() {
  const { content, loading } = useCMS("AboutPage.ProjectShowcase");

  if (loading) return <div className="w-full h-64 bg-[#8FA3A3] animate-pulse"></div>;

  return (
    <div className="w-full py-8 sm:py-10 bg-[#8FA3A3] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 sm:px-6 lg:px-10">

      {/* Image Card */}
      <div className="relative rotate-[-2deg] p-2 sm:p-3 hover:rotate-5">
        <img
          src={content.main_image || youtubeImg}
          alt="YouTube"
          className="w-[300px] sm:w-[400px] lg:w-[500px] rounded-sm object-cover transition-transform duration-300"
        />
        {/* Overlay Image */}
        <img
          src={content.overlay_image || asset25Img}
          alt="Asset 25"
          className="absolute top-0 -left-8 sm:-left-12 lg:-left-15 w-[40px] sm:w-[45px] lg:w-50 h-[48px] sm:h-[54px] lg:h-60 object-contain transition-transform duration-300"
        />
      </div>

      {/* Arrow 3 Image */}
      <div className="hidden lg:block">
        <img
          src={content.arrow_image || arrow3Img}
          alt="Arrow 3"
          className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 object-contain"
        />
      </div>

      {/* Right Side Text */}
      <div className="text-white max-w-[300px] sm:max-w-[400px] lg:max-w-md text-center lg:text-left">
        <p
          className="text-[28px] sm:text-[36px] lg:text-[45px] font-bold leading-relaxed font-['Caveat'] italic -skew-x-6 whitespace-pre-line"
        >
          {content.text || "We bought a 130 year old\nhouse and we're documenting\nthe restoration."}
        </p>
      </div>

    </div>
  );
}
