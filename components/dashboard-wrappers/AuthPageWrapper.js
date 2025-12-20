import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import LoginForm from "../forms/LoginForm";

const AuthPageWrapper = () => {
  return (
    <Grid
      container
      elevation={16}
      sx={{
        display: "flex",
        width: { xs: "90%", md: "80%", lg: "70%" },
        height: { xs: "90%", md: "70%" },
        borderRadius: 4,
        backdropFilter: "blur(12px)",
        overflow: "hidden",
      }}
    >
      <Grid
        size={{ xs: 12, md: 8 }}
        padding={4}
        sx={{
          position: "relative",
          display: "flex",
          // display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          textAlign: "center",
          color: "white",
          minHeight: "50%",
          background:
            "linear-gradient(to bottom right, rgba(0,0,0,0.1), rgba(0,0,0,0.2))",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Box
            sx={{
              width: { xs: 64, md: 128 },
              height: { xs: 64, md: 128 },
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image
              src="https://vinesh-minio-01.chbk.dev/vinesh-watch/1766217820589-05.png"
              alt="Logo"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>

          <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              خوش آمدید
            </Typography>

            <Typography variant="body1">
              لطفا وارد حساب کاربری خود شوید
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "auto",
            minHeight: "60%",
            backgroundImage: "url('/images/general/ecommerce.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
      </Grid>

      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          color: "white",
          background:
            "linear-gradient(to bottom right, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
        }}
      >
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default AuthPageWrapper;
