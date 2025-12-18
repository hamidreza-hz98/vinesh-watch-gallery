"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  Box,
  ListItemAvatar,
  Chip,
} from "@mui/material";
import Loader from "../common/Loader";
import { setFilePath } from "@/lib/media";
import Image from "next/image";
import { formatPrice, toPersian } from "@/lib/number";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Link from "next/link";

export default function TopProducts({ title, data, suffix, suffixLabel }) {
  const theme = useTheme();

  if (!data) {
    return <Loader />;
  }

  return (
    <Card sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Divider
          sx={{ width: 5, height: 32, bgcolor: theme.palette.primary.main }}
          orientation="vertical"
          flexItem
        />

        <Typography variant="h3">{title}</Typography>
      </Box>

      <List>
        {data?.map((item, index) => {
          const finalPrice = item.discount
            ? item.price - item.discount
            : item.price;

          return (
            <>
              <Box
                component={Link}
                href={`${process.env.NEXT_PUBLIC_LANDING_BASE_URL}/products/${item.slug}`}
                key={index}
                sx={{ display: "flex", alignItems: "center", py: 1 }}
              >
                {item.media?.[0] && (
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      ml: 1,
                    }}
                    >
                    <Image
                      src={`/media/${encodeURIComponent(item.media[0].filename)}`}
                      alt={item.title}
                      width={60}
                      height={60}
                      unoptimized
                      crossOrigin="anonymous"
                      loading="lazy"
                      style={{
                        objectFit: "cover",
                        borderRadius: 30,
                      }}
                    />
                  </Box>
                )}

                {/* Item details */}
                <Box width="-webkit-fill-available">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography color="text.primary" fontSize={16}>
                      {item.title}
                    </Typography>

                    <Chip
                      icon={
                        suffix === "visits" ? (
                          <VisibilityIcon />
                        ) : (
                          <AttachMoneyIcon />
                        )
                      }
                      size="small"
                      color="primary"
                      label={toPersian(item[suffix]) + " " + suffixLabel}
                      sx={{
                        "& .MuiChip-label": {
                          px: 0,
                        },

                        "&.MuiChip-root": {
                          color: theme.palette.primary.contrastText,
                        },
                      }}
                    />
                  </Box>

                  {/* Price info */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 0.5,
                      alignItems: "center",
                    }}
                  >
                    {item.discount > 0 && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                      >
                        {formatPrice(item.price)} تومان
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary"
                    >
                      {formatPrice(finalPrice)} تومان
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {index !== data.length - 1 && (
                <Divider variant="middle" sx={{ mt: 1 }} />
              )}
            </>
          );
        })}
      </List>
    </Card>
  );
}
