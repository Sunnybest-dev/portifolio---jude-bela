import React from "react";
import profile from "../../images/Johnny+7.webp";

export default function AboutHero() {
  return (
    <section className="w-full min-h-screen bg-[#e9e3d6] bg-[url('/paper-texture.png')] bg-cover bg-center flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 pt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-serif text-[#1f1f1f] leading-tight">
            About Jude Bela
          </h1>

          {/* Green underline */}
          <div className="w-full max-w-[420px] h-[3px] bg-[#5f6f63] mt-4 mb-6 sm:mb-8 lg:mb-10 mx-auto lg:mx-0"></div>

          <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed sm:leading-[32px] lg:leading-[36px] text-[#2c2c2c] font-serif max-w-[600px] mx-auto lg:mx-0">
            Jude Bela is an Emmy-winning independent journalist and
            contributor to the New York Times. Based in Washington, DC,
            Bela reports on interesting trends and stories domestically and
            around the globe, publishing to his audience of over 3.5 million
            on Youtube. Bela produced and hosted the twice Emmy-nominated
            series Borders for Vox Media. His visual style blends motion
            graphics with cinematic videography to create content that
            explains complex issues in relatable ways.
          </p>

          {/* CONTACT */}
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <a
              href="#"
              className="uppercase tracking-widest text-sm font-semibold text-black border-b-2 border-[#c24a3a] pb-1"
            >
              Contact
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE STACK */}
        <div className="relative flex justify-center mt-8 lg:mt-0">

          {/* Main Image */}
          <img
            src={profile}
            alt="Jude Bela"
            className="relative w-full max-w-[400px] sm:max-w-[480px] lg:w-[540px] h-[250px] sm:h-[300px] lg:h-[360px] object-cover border border-black"
          />
        </div>

      </div>
    </section>
  );
}
