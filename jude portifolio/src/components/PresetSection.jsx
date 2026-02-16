import React from "react";
import booksImg from "../../images/books.webp";
import rayImg from "../../images/ray.webp";
import arrowImg from "../../images/arrow.webp";

export default function PresetSection() {
  return (
    <div className="w-full overflow-hidden">
      {/* Teal section - presets and LUTs (johnnyharris.ch color #7f9696) */}
      <section className="bg-[#7f9696] flex items-center py-0 lg:py-0 lg:h-100">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          {/* Left: Headline + link */}
          <div className="max-w-lg text-white z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-4xl font-light leading-tight mb-4 font-['Vario']">
              <span className="border-b-3 border-[#e05532] pb-1">I made custom</span>
              <br />
              <span className="border-b-3 border-[#e05532] pb-1">
                presets and LUTs.
              </span>
            </h2>
          </div>

          {/* Arrow Image */}
          <div className="hidden lg:block w-16 h-16">
            <img
              src={arrowImg}
              alt="Arrow"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right: Images Group */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Books Image */}
            <div className="w-full max-w-[600px] lg:max-w-none lg:w-[520px] h-[600px] lg:h-[520px] z-10 -mb-9.5">
              <img
                src={booksImg}
                alt="Books"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Ray Image */}
            <div className="w-full max-w-[180px] lg:max-w-none lg:w-[150px] h-[180px] lg:h-[150px] z-10">
              <img
                src={rayImg}
                alt="Ray"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Orange bar - Join The Team (#e05532) */}
      <section className="bg-[#e05532] text-black sm:py-6 sm:pt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl text-white lg:text-4xl font-light mb-10 font-['Vario']">
            Join The Team
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 lg:gap-20 text-sm tracking-[0.2em] uppercase font-medium">
            <a
              href="#"
              className="border-b-2 border-white pb-2 hover:opacity-90 transition-opacity font-['Vario']"
            >
              Researcher / Writer
            </a>
            <a
              href="#"
              className="border-b-2 border-white pb-2 hover:opacity-90 transition-opacity font-['Vario']"
            >
              Editor / Animator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
