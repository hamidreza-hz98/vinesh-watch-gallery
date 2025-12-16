"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import nookies from "nookies";
import { getCustomerAddresses } from "@/store/address/address.actions";
import { Box, Stack } from "@mui/material";
import Addresses from "../common/Addresses";
import Payments from "../Payments";

const CartShipmentPageWrapper = () => {
  const dispatch = useDispatch();
  const { customer } = nookies.get();
  
  useEffect(() => {
    dispatch(getCustomerAddresses(customer));
  }, [dispatch, customer]);

  return <Stack>
    <Box>
    <Addresses />
    </Box>
    
    {/* <Box>
     <Payments />
    </Box> */}
  </Stack>;
};

export default CartShipmentPageWrapper;
