"use client";

import { setFilePath } from "@/lib/media";
import { Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import Image from "next/image";
import React from "react";
import Loader from "../common/Loader";
import routes from "@/constants/landing.routes";
import { useLandingData } from "@/providers/LandingDataProvider";
import LandingPageContainer from "../common/LandingPageContainer";

const AboutPageWrapper = () => {
  const theme = useTheme();
  const { settings } = useLandingData()

  if (!settings) return <Loader />;

  return (
    <LandingPageContainer breadcrumbs={[
      {
        name: routes.home.label,
        path: routes.home.link,
      },
      {
        name: routes.about.label,
        path: "",
      },
    ]}>
      <Box
        sx={{
          width: "100%",
          display: "block",
          mt:2
        
        }}
      >
        {/* FLOAT IMAGE ON MD+ */}
        <Box
          sx={{
            float: { md: "left" },
            width: { xs: "100%", md: "45%" },
            mr: { md: 3 },
            mb: 3,
          }}
        >
          <Image
            src={settings.about.image.path}
            alt={settings.about.image.mediaAlt}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              boxShadow: `0 10px 30px ${theme.palette.primary.main}25`,
            }}
          />
        </Box>

        <Typography
          variant="h4"
          fontWeight={700}
          color={theme.palette.primary.main}
          mb={2}
        >
          درباره ی فروشگاه گالری ساعت Vinesh
        </Typography>

        <div dangerouslySetInnerHTML={{ __html: settings.about.description }} />
      </Box>
    </LandingPageContainer>
  );
};

export default AboutPageWrapper;
