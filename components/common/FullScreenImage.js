"use client";

import React, { useState } from "react";
import Image from "next/image";
import Slider from "./Slider";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const FullscreenImage = ({ slides, initialSlide, onClose }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        bgcolor: "rgba(0,0,0,0.85)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "white",
          transition: "0.2s",
          "&:hover": {
            color: "warning.main",
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 30 }} />
      </IconButton>

      {/* Slider container */}
      <Box
        sx={{
          width: "100%",
          maxHeight: "95vh",
          overflow: "hidden",
        }}
      >
        <Slider
          options={{
            slides: slides.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt="Slide"
                width={0}
                height={0}
                sizes="100vw"
                unoptimized
                crossOrigin="anonymous"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "auto",
                  maxHeight: "90vh",
                }}
              />
            )),
            effect: "slide",
            spaceBetween: 10,
            slidesPerView: 1,
            loop: false,
            autoplay: false,
            navigation: true,
            pagination: false,
            thumbs: false,
            initialSlide,
          }}
        />
      </Box>
    </Box>
  );
};

export default FullscreenImage;
