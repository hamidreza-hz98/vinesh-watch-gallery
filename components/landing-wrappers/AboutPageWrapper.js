"use client";

import { setFilePath } from "@/lib/media";
import { selectSettings } from "@/store/settings/settings.selector";
import { Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import routes from "@/constants/landing.routes";

const AboutPageWrapper = () => {
  const theme = useTheme();
  const { about } = useSelector(selectSettings);

  if (!about) return <Loader />;

  return (
    <PageContainer breadcrumbs={[
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
            src={setFilePath(about.image.path)}
            alt={about.image.mediaAlt}
            crossOrigin="anonymous"
            unoptimized
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

        <div dangerouslySetInnerHTML={{ __html: about.description }} />
      </Box>
    </PageContainer>
  );
};

export default AboutPageWrapper;
