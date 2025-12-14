"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { setFilePath } from "@/lib/media";
import { Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: (theme.vars || theme).palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function MediaMasonry({
  media,
  onSelect,
  onDelete,
  multiple = false,
}) {
  const [selected, setSelected] = React.useState([]);

const isSelected = (item) => selected.some((s) => s._id === item._id);

const handleSelectItem = (item) => {
  setSelected((prev) => {
    let newSelection;
    if (isSelected(item)) {
      // Deselect
      newSelection = prev.filter((s) => s._id !== item._id);
    } else {
      // Select
      newSelection = multiple ? [...prev, item] : [item];
    }

    onSelect?.(newSelection);
    return newSelection;
  });
};


  return (
    <Box sx={{ width: "100%", minHeight: 829 }}>
      <Masonry
        sx={{ width: "100%" }}
        columns={{ xs: 2, sm: 3, md: 4 }}
        spacing={4}
      >
        {media?.map((item, index) => {
          const selectedState = isSelected(item);
          return (
            <Box
              key={index}
              sx={{
                cursor: "pointer",
                border: selectedState
                  ? "3px solid #1976d2"
                  : "3px solid transparent",
                borderRadius: 2,
                overflow: "hidden",
                transition: "all 0.2s ease",
              }}
            >
              <Label>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle2">
                    {item?.title}
                  </Typography>

                  <CancelOutlinedIcon
                    color="error"
                    onClick={() => onDelete(item._id)}
                  />
                </Box>
              </Label>

              {item?.mimeType?.includes("image") && (
                <Image
                  onClick={() => handleSelectItem(item)}
                  src={ setFilePath(item.path) }
                  alt={item?.title}
                  crossOrigin="anonymous"
                  unoptimized
                  loading="lazy"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                  }}
                />
              )}
              {item?.mimeType?.includes("video") && (
                <video
                  onClick={() => handleSelectItem(item)}
                  controls
                  width="100%"
                  crossOrigin="anonymous"
                >
                  <source src={setFilePath(item.path)} type={item.mimeType} />
                </video>
              )}
              {item?.mimeType?.includes("catalogue") && (
                <iframe
                  onClick={() => handleSelectItem(item)}
                  src={setFilePath(item.path)}
                  style={{
                    width: "100%",
                    height: 300,
                    border: "none",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Masonry>
    </Box>
  );
}
