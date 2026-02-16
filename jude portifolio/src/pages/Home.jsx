import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import NewsletterSection from "../components/NewsletterSection";
import PresetSection from "../components/PresetSection";
import SubmitIdeasSection from "../components/SubmitIdeasSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
    
      <PresetSection />
      <SubmitIdeasSection />
        <NewsletterSection />
      <Footer />
    </div>
  );
}
