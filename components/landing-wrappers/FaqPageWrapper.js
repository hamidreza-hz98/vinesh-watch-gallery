"use client";

import { selectSettings } from "@/store/settings/settings.selector";
import React from "react";
import { useSelector } from "react-redux";
import PageContainer from "../common/PageContainer";
import routes from "@/constants/landing.routes";
import {
  Box,
  Typography,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loader from "../common/Loader";

const FaqPageWrapper = () => {
  const theme = useTheme();
  const { faq } = useSelector(selectSettings);

  if (!faq) {
    return <Loader />;
  }

  return (
    <PageContainer
      breadcrumbs={[
        {
          name: routes.home.label,
          path: routes.home.link,
        },
        {
          name: routes.faq.label,
          path: "",
        },
      ]}
    >
     
        <Typography my={2} variant="h1">سوالات متداول گالری ساعت Vinesh</Typography>

        {faq.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              bgcolor:  theme.palette.background.paper,
              color: theme.palette.text.primary,
              boxShadow: theme.shadows[1],
              borderRadius: 2,
              mt: 2,
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />
              }
              sx={{
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
                py: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                {item.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6,
                }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </PageContainer>
  );
};

export default FaqPageWrapper;
