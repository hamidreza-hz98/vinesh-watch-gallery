"use client";

import { setFilePath } from "@/lib/media";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const SearchResultCard = ({ entity }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 2,
        transition: "0.2s",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <Box height={80}>
        <Image
          src={
            `/media/${encodeURIComponent(entity?.media?.[0].filename)}` ||
            `/media/${encodeURIComponent(entity.image.filename)}`
          }
          alt={entity?.title || entity.name}
          width={0}
          height={0}
          sizes="100vw"
          unoptimized
          crossOrigin="anonymous"
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
            objectFit: "cover",
          }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600}>
          {entity?.title || entity?.name || ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default SearchResultCard;
