"use client";

import { Backdrop } from "@mui/material";
import React from "react";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

const Loader = () => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={true}
    >
      <Quantum size="100" speed="1.8" color="white" />
    </Backdrop>
  );
};

export default Loader;
