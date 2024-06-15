"use client";
import img1 from "../../../assets/hero-carousel-img/img1.avif";
import img2 from "../../../assets/hero-carousel-img/img2.avif";
import img3 from "../../../assets/hero-carousel-img/img3.avif";
import img4 from "../../../assets/hero-carousel-img/img4.avif";
import img5 from "../../../assets/hero-carousel-img/img5.avif";
import img6 from "../../../assets/hero-carousel-img/img6.webp";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box } from "@mui/system";
import Image from "next/image";

const images = [img1, img2, img3, img4, img5, img6];
const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    cssEase: "ease-in",
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box height="350px" maxWidth={910} key={index}>
            <Image
              src={img}
              alt={`Hero Carousel Image ${index} `}
              className="bg-cover w-full h-full rounded-md"
            />
          </Box>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
