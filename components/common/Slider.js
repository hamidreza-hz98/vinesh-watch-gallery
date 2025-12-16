"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Box } from "@mui/material";

const Slider = ({ options }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {/* Main Slider */}
      <Swiper
        spaceBetween={options.spaceBetween}
        slidesPerView={options.slidesPerView || 1}
        loop={options.loop}
        autoplay={
          options.autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        navigation={options.navigation}
        pagination={options.pagination ? { clickable: true } : false}
        thumbs={options.thumbs ? { swiper: thumbsSwiper } : undefined}
        initialSlide={options.initialSlide || 0}
        modules={[Navigation, Pagination, Thumbs, Autoplay]}
        breakpoints={options.breakpoints}
        style={{ marginTop: 32 }} // mt-8
      >
        {options?.slides?.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {slide}
            </Box>
          </SwiperSlide>
        ))}

        <style>
          {`
          .swiper-button-next,
          .swiper-button-prev {
            color: #facc15;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            color: #eab308;
          }

          .swiper-wrapper {
            align-items: center;
          }
        `}
        </style>
      </Swiper>

      {/* Thumbnails Slider (Optional) */}
      {options.thumbs && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={options.thumbSlidesPerView || 4.5}
          watchSlidesProgress={true}
          initialSlide={options.initialSlide || 0}
          modules={[Thumbs]}
          style={{ marginTop: 16 }} // mt-4
        >
          {options?.slides?.map((thumb, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {thumb}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Slider;
