/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { formatPrice, toPersian } from "@/lib/number";
import Link from "next/link";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import nookies from "nookies";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useLandingData } from "@/providers/LandingDataProvider";
import { updateCart } from "@/app/actions/cart";

const PrimaryProductCard = ({ product }) => {
  const { cart, setCart } = useLandingData();
  const theme = useTheme();

  const notifications = useNotifications();
  const { customer } = nookies.get();

  const [isInCart, setIsInCart] = useState(null);

  const hasDiscount = product.discount > 0;
  const inStock = product.stock > 0;

  // calculate discounted price if discount exists
  const finalPrice = hasDiscount
    ? product.price - product.discount
    : product.price;

  // sample image fallback
  const imagePath =
    product.media?.[0]?.path ||
    "https://via.placeholder.com/400x400?text=No+Image";

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
      notifications.show(error.message || error.message, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleRemoveFromcart = async () => {
    try {
      const { message, data } = await updateCart(cart._id, {
        customerId: customer || null,
        action: isInCart.quantity > 1 ? "decrease" : "remove",
        productId: product._id,
      });

      setCart(data);

      notifications.show(message || "سبد خرید با موفقیت ویرایش شد!", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show(error.message, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    const updatedCart = cart?.products?.find(
      (item) => item.product._id === product?._id
    );

    setIsInCart(updatedCart);
  }, [cart, product?._id]);

  return (
    <Card
      component={Link}
      href={`/products/${product.slug}`}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: 450,
        gap: 2,
        borderRadius: 3,
        overflow: "hidden",
        p: 2,
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[6],
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* 🔴 Discount Badge */}
      {hasDiscount && inStock && (
        <Box
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            px: 1.2,
            py: 0.4,
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 700,
            zIndex: 2,
          }}
        >
          تخفیف
        </Box>
      )}

      {/* 🖼️ Product Image */}
      <Image
        src={imagePath}
        alt={product.title.name}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          width: "100%",
          height: "100%",
          borderRadius: 8,
          overflow: "hidden",
          objectFit: "cover",
          transition: "transform 0.4s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />

      {/* ⚫ Out of Stock Overlay */}
      {!inStock && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
              border: `2px solid ${theme.palette.text.primary}`,
              borderRadius: 2,
              px: 2,
              py: 0.5,
            }}
          >
            ناموجود
          </Typography>
        </Box>
      )}

      {/* 🧾 Product Details */}
      <CardContent sx={{ flexGrow: 1, p: 0 }}>
        <Typography
          variant="subtitle2"
          fontSize={12}
          color="text.secondary"
          mb={0.5}
        >
          {product.brand.name}
        </Typography>

        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="text.primary"
          mb={0.5}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={1.5}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {product.excerpt}
        </Typography>

        {/* 💰 Prices */}
        {hasDiscount ? (
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography color="primary" fontWeight={600} variant="body1">
              {formatPrice(finalPrice)} تومان
            </Typography>

            <Typography
              variant="body2"
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

      {/* 🛒 Action Buttons */}
      {isInCart ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Typography variant="caption">تعداد در سبد خرید شما:</Typography>

          <Box display="flex" alignItems="center" justifyContent="flex-end">
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                handleAddToCart();
              }}
            >
              <AddIcon />
            </IconButton>

            <Typography mx={1}>{toPersian(isInCart.quantity)}</Typography>

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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                handleRemoveFromcart();
              }}
            >
              {isInCart.quantity === 1 ? <DeleteOutlineIcon /> : <RemoveIcon />}
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Button
          fullWidth
          variant="contained"
          color={inStock ? "primary" : "inherit"}
          disabled={!inStock}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            handleAddToCart();
          }}
          sx={{
            color: inStock
              ? theme.palette.primary.contrastText
              : theme.palette.text.disabled,
            fontWeight: 700,
            borderRadius: 2,
            py: 1,
            mt: 2,
          }}
        >
          افزودن به سبد
        </Button>
      )}
    </Card>
  );
};

export default PrimaryProductCard;
