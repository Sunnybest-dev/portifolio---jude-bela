import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="w-full pt-8">
      <Header />
      <div className="h-[40vh] bg-[#e05532] flex items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          404 - Page Not Found
        </h1>
      </div>
      <Footer />
    </div>
  );
}
