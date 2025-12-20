"use client";

import LandingPageContainer from "@/components/common/LandingPageContainer";
import ProfileSidebar from "@/components/layout/profile/ProfileSidebar";
import { Grid } from "@mui/material";

export default function ProfileLayout({ children }) {
  return (
    <LandingPageContainer>
      <Grid
      spacing={4}
        container
        sx={{
          minHeight: "70vh",
        }}
      >
        <Grid size={{ xs: 12, md: 3 }} sx={{ height: "auto" }} >
          <ProfileSidebar />
        </Grid>

        <Grid
          size={{ xs: 12, md: 9 }}
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {children}
        </Grid>
      </Grid>
    </LandingPageContainer>
  );
}
