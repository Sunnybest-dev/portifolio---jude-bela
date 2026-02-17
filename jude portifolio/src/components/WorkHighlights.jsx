import React from "react";

export default function WorkHighlights() {
  return (
    <div className="w-full bg-[#1f1f1f] py-8 sm:py-10" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 lg:gap-32 px-6">

        {/* Item 1 */}
        <div className="flex flex-col items-center">
          <span className="text-white text-xs sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase font-medium text-center">
            Vox Borders Series
          </span>
          <div className="w-[140px] sm:w-[180px] h-[2px] bg-[#e4572e] mt-2 sm:mt-3"></div>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-center">
          <span className="text-white text-xs sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase font-medium text-center">
            The New York Times
          </span>
          <div className="w-[150px] sm:w-[190px] h-[2px] bg-[#e4572e] mt-2 sm:mt-3"></div>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-center">
          <span className="text-white text-xs sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase font-medium text-center">
            Jude's Channel
          </span>
          <div className="w-[130px] sm:w-[170px] h-[2px] bg-[#e4572e] mt-2 sm:mt-3"></div>
        </div>

      </div>
    </div>
  );
}
