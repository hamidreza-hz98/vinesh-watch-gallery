"use client";

import React from "react";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import routes from "@/constants/landing.routes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { selectSettings } from "@/store/settings/settings.selector";

const TermsPageWrapper = () => {
  const theme = useTheme();
  const { terms } = useSelector(selectSettings);

  if (!terms) {
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
          name: routes.terms.label,
          path: "",
        },
      ]}
    >
     
        <Typography my={2} variant="h1">
          شرایط استفاده از گالری ساعت Vinesh
        </Typography>

        {terms.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              boxShadow: theme.shadows[1],
              mt:2,
              borderRadius: 2,
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
                {item.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <div
                style={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6,
                }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </AccordionDetails>
          </Accordion>
        ))}
    </PageContainer>
  );
};

export default TermsPageWrapper;
