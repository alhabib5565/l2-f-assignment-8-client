import SectionHeader from "@/components/shared/SectionHeader";
import { Container } from "@mui/material";
import React from "react";

import Chaldal from "../../../assets/brands/Chaldal.png";
import downy from "../../../assets/brands/downy.jpeg";
import gain from "../../../assets/brands/Gain.png";
import oxiClean from "../../../assets/brands/OxiClean.png";
import rin from "../../../assets/brands/Rin.jpeg";
import tide from "../../../assets/brands/Tide.png";
import Link from "next/link";
import Image from "next/image";

const brandsData = [
  {
    name: "Chaldal",
    logo: Chaldal,
  },
  {
    name: "Downy",
    logo: downy,
  },
  {
    name: "Gain",
    logo: gain,
  },
  {
    name: "OxiClean",
    logo: oxiClean,
  },
  {
    name: "Rin",
    logo: rin,
  },
  {
    name: "Tide",
    logo: tide,
  },
];

const TopBrands = () => {
  return (
    <section
      style={{
        clipPath: "polygon(0% 0%, 100% 10%, 100% 100%, 0% 90%)",
      }}
      className="lg:py-32 py-20 bg-slate-100"
    >
      <Container>
        <SectionHeader
          title="Top Brands"
          description="Top brands for impeccable laundry care."
        />

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-10">
          {brandsData.map((brand) => (
            <Link
              className="w-full h-[200px] bg-slate-300 relative border-2 border-primary/30 hover:border-primary rounded-md overflow-hidden"
              key={brand.name}
              href={`products?brand=${brand.name}`}
            >
              <Image
                className="w-ful h-full rounded-md"
                alt=""
                src={brand.logo}
              />
              <div className="absolute inset-0 bg-primary/25"></div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopBrands;
