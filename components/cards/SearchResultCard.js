"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchResultCard = ({ entity, href,onClick }) => {
  return (
    <Box
      component={Link}
      href={href}
      onClick={onClick}
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
          src={entity?.media?.[0].path || entity.image.path}
          alt={entity?.title || entity.name}
          width={0}
          height={0}
          sizes="100vw"
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
