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
import { TProduct } from "@/type/product.type";

type TProductDetailsCarouselProp = Pick<TProduct, "images" | "thumbnail">;

const ProductDetailsCarousel = ({
  thumbnail,
  images,
}: TProductDetailsCarouselProp) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const allImages = [...images, thumbnail];
  return (
    <>
      <div className=" h-[400px] lg:h-[500px] border rounded-md p-2">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {allImages.map((img, index) => (
            <SwiperSlide className="flex" key={index}>
              <Image
                className=" object-contain max-h-[450px] mx-auto"
                width={500}
                height={500}
                src={img}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <div className="h-[50px] ">
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
          {allImages.map((img, index) => (
            <SwiperSlide
              className="border mx-auto rounded-md cursor-pointer"
              key={index}
            >
              <Image
                className="object-contain mx-auto h-[50px]"
                width={100}
                height={50}
                src={img}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </>
  );
};

export default ProductDetailsCarousel;
