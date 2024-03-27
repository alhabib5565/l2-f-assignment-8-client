import React from "react";
import HeroSection from "@/components/homePage/hero/HeroSection";
import FlashSale from "@/components/homePage/flashSale/FlashSale";
import TopBrands from "@/components/homePage/brandSection/TopBrands";
import PopularProductSection from "@/components/homePage/popularProductsSection/PopularProductSection";
import Sponser from "@/components/homePage/sponser/Sponser";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FlashSale />
      <TopBrands />
      <PopularProductSection />
      <Sponser />
    </div>
  );
};

export default HomePage;
