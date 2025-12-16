"use client";

import React, { useState } from "react";
import PageContainer from "../common/PageContainer";
import { Box, useTheme } from "@mui/material";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";

const AuthenticationPageWrapper = () => {
  const [form, setForm] = useState("login");

  const theme = useTheme();

  return (
    <PageContainer>
      <Box
        height={"80vh"}
        width={"100vw"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box bgcolor={theme.palette.background.paper} p={4} borderRadius={2}>
          {form === "login" ? <LoginForm onSwitch={() => setForm("signup")} /> : <SignupForm onSwitch={() => setForm("login")} />}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default AuthenticationPageWrapper;
