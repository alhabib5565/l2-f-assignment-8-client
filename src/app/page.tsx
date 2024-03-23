import React from "react";
import HeroSection from "@/components/homePage/hero/HeroSection";
import FlashSale from "@/components/homePage/flashSale/FlashSale";
import TopBrands from "@/components/homePage/brandSection/TopBrands";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FlashSale />
      <TopBrands />
    </div>
  );
};

export default HomePage;
