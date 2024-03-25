"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

const images = [
  "https://chaldn.com/_mpimage/wheel-washing-powder-2-in-1-clean-fresh-2-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D127801&q=best&v=1&m=400&webp=1",
  "https://chaldn.com/_mpimage/shuvro-fabric-brightener-100-ml?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D122928&q=best&v=1&m=400&webp=1",
  "https://chaldn.com/_mpimage/shuvro-fabric-brightener-100-ml?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D122928&q=best&v=1&m=400&webp=1",
];
const ProductDetailsCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((img) => (
          <SwiperSlide className="border rounded-md" key={img}>
            <Image width={500} height={500} src={img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwipe mt-4"
      >
        {images.map((img) => (
          <SwiperSlide
            className="border mx-auto rounded-md cursor-pointer"
            key={img}
          >
            <Image width={100} height={50} src={img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductDetailsCarousel;
