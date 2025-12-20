"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatPrice, toPersian } from "@/lib/number";
import Image from "next/image";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import nookies from "nookies";
import { useLandingData } from "@/providers/LandingDataProvider";
import { updateCart } from "@/app/actions/cart";

const InCartProductCard = ({ product, quantity, isFinalize = false }) => {
  const theme = useTheme();
  const notifications = useNotifications();

  const { customer } = nookies.get();
  const { cart, setCart } = useLandingData();

  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price - product.discount
    : product.price;

  const handleAddToCart = async () => {
    try {
      const { message, data } = await updateCart(cart._id, {
        customerId: customer || null,
        action: "add",
        productId: product._id,
      });

      setCart(data);

      notifications.show(message || "سبد خرید با موفقیت ویرایش شد!", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show(error.message || "مشکلی پیش آمد!", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleRemoveFromcart = async () => {
    try {
      const { message, data } = await updateCart(cart._id, {
        customerId: customer || null,
        action: quantity > 1 ? "decrease" : "remove",
        productId: product._id,
      });

      setCart(data);

      notifications.show(message || "سبد خرید با موفقیت ویرایش شد!", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show(error.message || "مشکلی پیش آمد!", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Card
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // mobile: column, desktop: row
        p: 1,
        borderRadius: 2,
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
      }}
    >
      {/* ROW 1 → IMAGE + TEXT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Image
          src={product?.media?.[0].path}
          alt={product?.title}
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

        <CardContent
          sx={{
            flexGrow: 1,
            p: "0 !important",
            textAlign: "right",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {product?.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product?.excerpt || ""}
          </Typography>

          {/* 💰 Prices */}
          {hasDiscount ? (
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography
                fontSize={15}
                color="primary"
                fontWeight={600}
                variant="body1"
              >
                {formatPrice(finalPrice)} تومان
              </Typography>

              <Typography
                variant="body2"
                fontSize={14}
                color="text.disabled"
                sx={{ textDecoration: "line-through" }}
              >
                {formatPrice(product.price)} تومان
              </Typography>
            </Box>
          ) : (
            <Typography color="primary" fontWeight={600} variant="body1">
              {formatPrice(product.price)} تومان
            </Typography>
          )}
        </CardContent>
      </Box>

      {/* ROW 2 → QUANTITY BOX (moves down on mobile) */}
      <Box
        display="flex"
        flexDirection={{ xs: "row", sm: "column" }}
        alignItems="center"
        minWidth="120px"
        width={{ xs: "100%", sm: "auto" }}
        justifyContent={{ xs: "space-between", sm: "end" }}
      >
        {isFinalize ? (
          <Typography>تعداد: {toPersian(quantity)}</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-end" },
              mt: { xs: 1, sm: 0 },
            }}
          >
            <Box display="flex" alignItems="center">
              <IconButton
                sx={{
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  mx: 1,
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
                size="small"
                onClick={handleAddToCart}
              >
                <AddIcon />
              </IconButton>

              <Typography mx={1}>{toPersian(quantity)}</Typography>

              <IconButton
                sx={{
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  mx: 1,
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
                size="small"
                onClick={handleRemoveFromcart}
              >
                {quantity === 1 ? <DeleteOutlineIcon /> : <RemoveIcon />}
              </IconButton>
            </Box>
          </Box>
        )}

        <Typography variant="caption" mt={1}>
          قیمت کل: {formatPrice(finalPrice * quantity)}
        </Typography>
      </Box>
    </Card>
  );
};

export default InCartProductCard;
