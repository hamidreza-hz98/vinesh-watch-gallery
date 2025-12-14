"use client";

import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { Grid } from "@mui/material";

const PageHeaderBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

const PageHeaderToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent:"end",
  gap: theme.spacing(1),
  // Ensure the toolbar is always on the right side, even after wrapping
  marginLeft: "auto",
}));

function PageContainer(props) {
  const { children, breadcrumbs, title, actions = null } = props;

  return (
    <Grid container padding={2} spacing={2} width="100%">
      <Grid size={{ xs: 12 }}>
        <PageHeaderBreadcrumbs
          aria-label="breadcrumb"
          separator={<ChevronLeftIcon fontSize="small" />}
        >
          {breadcrumbs
            ? breadcrumbs.map((breadcrumb, index) => {
                return breadcrumb.path ? (
                  <MuiLink
                    key={index}
                    component={Link}
                    underline="hover"
                    color="inherit"
                    href={breadcrumb.path}
                  >
                    {breadcrumb.name}
                  </MuiLink>
                ) : (
                  <Typography
                    key={index}
                    sx={{ color: "text.primary", fontWeight: 600 }}
                  >
                    {breadcrumb.name}
                  </Typography>
                );
              })
            : null}
        </PageHeaderBreadcrumbs>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        {title ? <Typography variant="h4">{title}</Typography> : null}
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <PageHeaderToolbar>{actions}</PageHeaderToolbar>
      </Grid>

      <Grid size={{ xs: 12 }}>{children}</Grid>
    </Grid>
  );
}

PageContainer.propTypes = {
  actions: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ),
  children: PropTypes.node,
  title: PropTypes.string,
};

export default PageContainer;
