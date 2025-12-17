"use client";

import React from "react";
import { Box, Stack } from "@mui/material";
import Addresses from "@/components/common/Addresses";

const CartShipmentPageWrapper = () => {

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
