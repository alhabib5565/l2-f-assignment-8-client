"use client";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import { Fab } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { TProduct } from "@/type";
import Image from "next/image";

type TProductDetailsCarouselProp = Pick<TProduct, "images" | "thumbnail">;

const ProductDetailsCarousel = ({
  thumbnail,
  images,
}: TProductDetailsCarouselProp) => {
  const [activeImage, setActiveImage] = useState(0);
  const dragX = useMotionValue(0);
  const allImages = [thumbnail, ...images];

  const previousImage = () => {
    setActiveImage((prev) =>
      activeImage === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveImage((prev) =>
      activeImage === allImages.length - 1 ? 0 : prev + 1
    );
  };

  // handle drag
  const DRAG = 50;
  const onDragEnd = () => {
    const x = dragX.get();

    if (x >= DRAG && activeImage > 0) {
      setActiveImage((prev) => prev - 1);
    } else if (x <= DRAG && allImages.length - 1 > activeImage) {
      setActiveImage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className="relative  w-full h-[300px] lg:h-[400px] border rounded-md overflow-hidden">
        <motion.div
          drag="x"
          onDragEnd={onDragEnd}
          style={{ x: dragX }}
          animate={{ translateX: `-${activeImage * 100}%` }}
          dragConstraints={{ left: 0, right: 0 }}
          className="w-full h-full flex"
        >
          {allImages.map((img, index) => (
            <div
              className="w-full shrink-0 h-auto cursor-grab active:cursor-grabbing  bg-center bg-contain bg-no-repeat"
              style={{
                backgroundImage: `url(${img})`,
              }}
              key={index}
            ></div>
          ))}
        </motion.div>
        <div>
          <Fab
            onClick={previousImage}
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
            }}
            color="primary"
            aria-label="add"
          >
            <ArrowLeft />
          </Fab>
          <Fab
            onClick={nextImage}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
            }}
            color="primary"
            aria-label="add"
          >
            <ArrowRight />
          </Fab>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 mt-2">
        {allImages.map((img, index) => (
          <button
            onClick={() => setActiveImage(index)}
            className={`w-[80px] border-2 rounded h-[50px] relative transition-all ${
              index === activeImage
                ? "opacity-100"
                : "opacity-50 hover:opacity-100"
            }`}
            key={index}
          >
            <Image
              alt=""
              fill
              src={img}
              className={`w-full object-contain h-full rounded`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsCarousel;
