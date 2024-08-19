"use client";
import img1 from "../../../assets/hero-carousel-img/image1.jpg";
import img2 from "../../../assets/hero-carousel-img/image2.jpg";
import img3 from "../../../assets/hero-carousel-img/image3.webp";
import img4 from "../../../assets/hero-carousel-img/image4.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box } from "@mui/system";
import Image from "next/image";

const images = [img1, img2, img3, img4];
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
          <Box
            sx={{ height: { xs: 300, md: 400 } }}
            maxWidth={"100%"}
            key={index}
          >
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
