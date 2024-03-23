import SectionHeader from "@/components/shared/SectionHeader";
import { Container } from "@mui/material";
import React from "react";
import TopBrandCard from "./TopBrandCard";

import fresh from "../../../assets/top-brand-logo/fresh.png";
import nestle from "../../../assets/top-brand-logo/nestle.png";
import pran from "../../../assets/top-brand-logo/pran.jpeg";
import rickitt from "../../../assets/top-brand-logo/rickitt.png";

const brands = [fresh, nestle, pran, rickitt];

const TopBrands = () => {
  return (
    <section
      style={{
        clipPath: "polygon(0% 0%, 100% 10%, 100% 100%, 0% 90%)",
      }}
      className="lg:py-48 py-24 bg-slate-100"
    >
      <Container>
        <SectionHeader
          title="Top Brands"
          description="Top brands for impeccable laundry care."
        />
        <div className="grid grid-rows-2 grid-cols-3 gap-4 mt-10">
          {brands.map((img, index) => (
            <TopBrandCard key={index} img={img} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopBrands;
