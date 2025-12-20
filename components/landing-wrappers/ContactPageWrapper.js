"use client";

import React from "react";
import routes from "@/constants/landing.routes";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Loader from "../common/Loader";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { toPersian } from "@/lib/number";
import ContactRow from "../common/ContactRow";
import ContactForm from "../forms/ContactForm";
import { useLandingData } from "@/providers/LandingDataProvider";
import LandingPageContainer from "../common/LandingPageContainer";

const ContactPageWrapper = () => {
  const theme = useTheme();
  const { settings } = useLandingData()

  if (!settings) {
    return <Loader />;
  }

  const { general } = settings
  const { contactInfo, social } = general;

  return (
    <LandingPageContainer
      breadcrumbs={[
        {
          name: routes.home.label,
          path: routes.home.link,
        },
        {
          name: routes.contact.label,
          path: "",
        },
      ]}
    >
      <Grid container spacing={4} mt={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            راه های تماس
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              background: theme.palette.primary.main,
              borderRadius: 10,
              mb: 3,
            }}
          />

          {contactInfo.mobile && (
            <ContactRow
              href={`tel:${contactInfo.mobile}`}
              label={`تماس تلفنی با ${toPersian(contactInfo.mobile)}`}
              color={theme.palette.primary.main}
              icon={
                <PhoneIphoneIcon
                  sx={{ ml: 1, color: theme.palette.primary.main }}
                />
              }
            />
          )}

          {social.whatsapp && (
            <ContactRow
              href={social.whatsapp}
              label="پیام به واتس اپ"
              color="#25D366"
              icon={<WhatsAppIcon sx={{ ml: 1, color: "#25D366" }} />}
            />
          )}

          {contactInfo.phone && (
            <ContactRow
              href={`tel:${contactInfo.phone}`}
              label={`تلفن ثابت: ${toPersian(contactInfo.phone)}`}
              color={theme.palette.primary.main}
              icon={
                <PhoneEnabledIcon
                  sx={{ ml: 1, color: theme.palette.primary.main }}
                />
              }
            />
          )}

          {contactInfo.email && (
            <ContactRow
              href={`mailto:${contactInfo.email}`}
              label={contactInfo.email}
              color={theme.palette.info.main}
              icon={
                <MailOutlineIcon
                  sx={{ ml: 1, color: theme.palette.info.main }}
                />
              }
            />
          )}

          <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
            شبکه های اجتماعی
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              background: theme.palette.primary.main,
              borderRadius: 10,
              mb: 3,
            }}
          />

          <Box display="flex" alignItems="center" justifyContent="space-around">
            {social.instagram && (
              <ContactRow
                href={social.instagram}
                color="#E1306C"
                icon={
                  <InstagramIcon
                    sx={{
                      color: "#E1306C",
                      fontSize: 32,
                      transition: "0.3s",
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  />
                }
              />
            )}

            {social.telegram && (
              <ContactRow
                href={social.telegram}
                color="#229ED9"
                icon={
                  <TelegramIcon
                    sx={{
                      color: "#229ED9",
                      fontSize: 32,
                      transition: "0.3s",
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  />
                }
              />
            )}



            {social.x && (
              <ContactRow
                href={social.x}
                color="#000000"
                icon={
                  <XIcon
                    sx={{
                      color: theme.palette.grey[400],
                      fontSize: 32,
                      transition: "0.3s",
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  />
                }
              />
            )}

            {social.facebook && (
              <ContactRow
                href={social.facebook}
                color="#1877F2"
                icon={
                  <FacebookIcon
                    sx={{
                      color: "#1877F2",
                      fontSize: 32,
                      transition: "0.3s",
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  />
                }
              />
            )}

            {social.linkedin && (
              <ContactRow
                href={social.linkedin}
                color="#0A66C2"
                icon={
                  <LinkedInIcon
                    sx={{
                      color: "#0A66C2",
                      fontSize: 32,
                      transition: "0.3s",
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  />
                }
              />
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography mb={2} variant="h4" fontWeight={600}>
            فرم تماس
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              background: theme.palette.primary.main,
              borderRadius: 10,
              mb: 3,
            }}
          />
          <ContactForm />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            آدرس مجموعه:
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 4,
              background: theme.palette.primary.main,
              borderRadius: 10,
              mb: 3,
            }}
          />

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {contactInfo.address}
          </Typography>

          <div dangerouslySetInnerHTML={{ __html: contactInfo.mapIframe }} />
        </Grid>
      </Grid>
    </LandingPageContainer>
  );
};

export default ContactPageWrapper;
