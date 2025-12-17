"use client";

import PageContainer from "@/components/common/PageContainer";
import ProfileSidebar from "@/components/layout/profile/ProfileSidebar";
import { Grid } from "@mui/material";

export default function ProfileLayout({ children }) {
  return (
    <PageContainer>
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
    </PageContainer>
  );
}
