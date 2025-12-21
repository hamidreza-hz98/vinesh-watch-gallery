"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";

const MediaPreview = ({ file, size = 96 }) => {
  if (!file) return null;

  const src = file.path;
  const mime = file.mimeType || "";
  const isImage = mime.startsWith("image/");
  const isVideo = mime.startsWith("video/");
  const isAudio = mime.startsWith("audio/");

  const altText =
    file?.translations?.[0]?.title || file.originalName || "media-preview";

  // ✅ IMAGE
  if (isImage) {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={src}
          alt={altText}
          fill
          style={{ objectFit: "cover" }}
          sizes={`${size}px`}
        />
      </Box>
    );
  }

  // ✅ VIDEO
  if (isVideo) {
    return (
      <Box
        sx={{
          width: size * 2,
          height: size,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <video
          src={src}
          width={size * 2}
          height={size}
          controls
          style={{ borderRadius: 8 }}
        />
      </Box>
    );
  }

  // ✅ AUDIO
  if (isAudio) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: size * 3,
          padding: 1,
          borderRadius: 1,
          border: "1px solid #eee",
        }}
      >
        <AudiotrackOutlinedIcon fontSize="small" />
        <audio controls src={src} style={{ width: "100%" }} />
      </Box>
    );
  }

  // ✅ OTHER FILES (PDF, ZIP, DOC, etc.)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid #eee",
        borderRadius: 1,
        padding: 1,
        width: size * 3,
      }}
    >
      <DescriptionOutlinedIcon fontSize="small" />
      <Typography variant="body2" noWrap title={file.originalName}>
        {file.originalName || "File"}
      </Typography>
    </Box>
  );
};

export default MediaPreview;
