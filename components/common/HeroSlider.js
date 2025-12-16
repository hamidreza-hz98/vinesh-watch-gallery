"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Box } from "@mui/material";
import { setFilePath } from "@/lib/media";
import Image from "next/image";

export default function HeroSlider({
  slides = [],
  height = "83vh",
}) {
  return (
    <Box sx={{ width: "100%", height }}>
      <Swiper
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay]}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={setFilePath(slide.path)}
                width={0}
                height={0}
                sizes="100vw"
                crossOrigin="anonymous"
                unoptimized
                alt={slide.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px"
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
