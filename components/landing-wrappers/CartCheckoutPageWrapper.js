"use client";

import { Stack } from "@mui/material";
import React from "react";
import InCartProductCard from "../cards/InCartProductCard";
import { useSelector } from "react-redux";
import { selectCart } from "@/store/cart/cart.selector";
import NoDataAvailable from "../common/NoDataAvailable";
import { useRouter } from "next/navigation";
import routes from "@/constants/landing.routes";

const CartCheckoutPageWrapper = () => {
  const cart = useSelector(selectCart)
  const router = useRouter()

  return (
    <Stack spacing={2}>
      {
      cart?.products && cart?.products.length !== 0 ?  
      cart?.products?.map(({ product, quantity }, index) => (
        <InCartProductCard key={index} quantity={quantity} product={product} />
      ))
      : <NoDataAvailable text="سبد خرید خالیه!" clickText="مشاهده محصولات" onClick={() => router.push(routes.products.link)} />
    }
    </Stack>
  );
};

export default CartCheckoutPageWrapper;
