import React from "react";

export default function Footer() {
  const socialLinks = [
    { name: "YOUTUBE", url: "https://youtube.com" },
    { name: "TIKTOK", url: "https://tiktok.com" },
    { name: "PATREON", url: "https://patreon.com" },
    { name: "FACEBOOK", url: "https://facebook.com" },
    { name: "INSTAGRAM", url: "https://instagram.com" },
    { name: "TWITTER", url: "https://twitter.com" },
  ];

  const navLinks = [
    ["HOME", "ABOUT", "CONTACT"],
    ["SHOP", "FAQS", "GEAR GUIDE"],
    ["PORTFOLIO", "SUBMIT IDEAS", "JOIN THE TEAM"],
  ];

  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative w-full px-4 sm:px-6 lg:px-16 py-16 lg:py-24 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* SOCIAL SECTION */}
          <div className="lg:col-span-1 pe-3.5">
            <h2 className="text-2xl lg:text-3xl font-light mb-6 lg:mb-8 tracking-wide whitespace-nowrap border-b-2 border-orange-500 pb-4 inline-block font-['Poppins']">
              Follow Jude
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:gap-6 text-[10px] lg:text-xs tracking-widest uppercase font-['Nord']">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION SECTION */}
          <div className="lg:col-span-2 border-l-2 border-white/50 pl-6 lg:pl-12">
            <div className="grid grid-cols-3 gap-6 lg:gap-12 text-[10px] lg:text-xs tracking-widest uppercase font-['Nord']">
              {navLinks.map((column, idx) => (
                <div key={idx} className="space-y-4 lg:space-y-6">
                  {column.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block hover:text-orange-500 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
            <div className="flex justify-start lg:justify-end">
              <div className="border-2 border-orange-500 px-4 py-2">
                <span className="text-2xl lg:text-3xl font-light tracking-widest font-['Poppins']">JB</span>
              </div>
            </div>

            <p className="text-left lg:text-right text-xs lg:text-sm leading-6 lg:leading-6 w-85 lg:ml-auto font-['Poppins']">
              Jude Bela is a journalist based in Washington, DC.
              You can find his work on Vox, The New York Times,
              and his YouTube channel.
            </p>

            <p className="text-left lg:text-right text-gray-500 text-xs font-['Poppins']">
              © Jude Bela {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
