import React from "react";
import Header from "../components/Header";
import PortfolioContent from "../components/PortfolioContent";
import Footer from "../components/Footer";

export default function Portfolio() {
  return (
    <div className="pt-20">
      <Header />
      <PortfolioContent />
      <Footer />
    </div>
  );
}
