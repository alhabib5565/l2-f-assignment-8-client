import SectionHeader from "@/components/shared/SectionHeader";
import { Container } from "@mui/material";
import React from "react";
import TopBrandCard from "./TopBrandCard";

const TopBrands = () => {
  return (
    <section
      style={{
        clipPath: "polygon(0% 0%, 100% 20%, 100% 100%, 0% 80%)",
      }}
      className="lg:py-32 py-20 bg-slate-100"
    >
      <Container>
        <SectionHeader
          title="Top Brands"
          description="Top brands for impeccable laundry care."
        />
        <TopBrandCard />
      </Container>
    </section>
  );
};

export default TopBrands;
