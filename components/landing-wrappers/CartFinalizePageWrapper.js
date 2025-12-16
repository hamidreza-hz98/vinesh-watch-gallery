"use client";

import { selectCart } from "@/store/cart/cart.selector";
import React from "react";
import { useSelector } from "react-redux";
import nookies from "nookies";
import { Box, Stack, Typography } from "@mui/material";
import InCartProductCard from "../cards/InCartProductCard";
import AddressCard from "../cards/AddressCard";

const CartFinalizePageWrapper = () => {
  const cart = useSelector(selectCart);
  const { customer } = nookies.get();

  return (
    <Stack spacing={2}>
      <Typography variant="h3">محصولات انتخاب شده:</Typography>

      {cart?.products?.map(({ product, quantity }, index) => (
        <InCartProductCard
          key={index}
          quantity={quantity}
          isFinalize
          product={product}
        />
      ))}

      <Box>
        <Typography mb={1} variant="h3">آدرس ارسال:</Typography>

        <AddressCard address={cart?.address} isInCart={false} controls={false} />
      </Box>
    </Stack>
  );
};

export default CartFinalizePageWrapper;
