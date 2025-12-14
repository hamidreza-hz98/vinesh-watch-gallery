"use client";

import * as React from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Stack from "@mui/material/Stack";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import Image from "next/image";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
}));

function DashboardHeader({ logo, title, menuOpen, onToggleMenu }) {
  const theme = useTheme();

  const handleMenuOpen = React.useCallback(() => {
    onToggleMenu(!menuOpen);
  }, [menuOpen, onToggleMenu]);

  const getMenuIcon = React.useCallback(
    (isExpanded) => {
      const expandMenuActionText = "باز کردن";
      const collapseMenuActionText = "بستن";

      return (
        <Tooltip
          title={`${
            isExpanded ? collapseMenuActionText : expandMenuActionText
          } منو`}
          enterDelay={1000}
        >
          <div>
            <IconButton
              size="small"
              aria-label={`${
                isExpanded ? collapseMenuActionText : expandMenuActionText
              } navigation menu`}
              onClick={handleMenuOpen}
            >
              {isExpanded ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </Tooltip>
      );
    },
    [handleMenuOpen]
  );

  return (
    <AppBar color="inherit" position="absolute" sx={{ displayPrint: "none" }}>
      <Toolbar sx={{ width: "100%", backgroundColor: "inherit" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Box sx={{ ml: 1 }}>{getMenuIcon(menuOpen)}</Box>

          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <Stack direction="row" alignItems="center">
              {logo ? (
                <Image
                  src={logo}
                  alt="Logo"
                  width={48}
                  height={48}
                  style={{ borderRadius: "50%" }}
                />
              ) : null}
              {title ? (
                <Typography
                  variant="h6"
                  sx={{
                    color: (theme.vars ?? theme).palette.primary.main,
                    fontWeight: "700",
                    mr: 1,
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                  }}
                >
                  {title}
                </Typography>
              ) : null}
            </Stack>
          </Link>

          <Stack sx={{ mr: 1 }}>
            <ThemeSwitcher />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

DashboardHeader.propTypes = {
  logo: PropTypes.node,
  menuOpen: PropTypes.bool.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default DashboardHeader;
