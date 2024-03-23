import Image, { StaticImageData } from "next/image";
import React from "react";

type TopBrandCardProp = {
  img: StaticImageData;
  index: number;
};

const TopBrandCard = ({ img, index }: TopBrandCardProp) => {
  return (
    <div
      className={`rounded-md border-transparent border-2 hover:border-primary relative${
        index === 0
          ? "col-span-1 row-span-2"
          : index === 2
          ? "col-span-1 row-span-2"
          : "col-span-1 row-span-1"
      } `}
      key={index}
    >
      <Image
        height={300}
        width={400}
        src={img}
        alt="brand image"
        className="w-ful h-full rounded-md"
      />
    </div>
  );
};

export default TopBrandCard;
