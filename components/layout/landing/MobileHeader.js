"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Loader from "../../common/Loader";
import Image from "next/image";
import Link from "next/link";
import { useDialogs } from "@/hooks/useDialogs/useDialogs";
import routes from "@/constants/landing.routes";
import useMenuLinks from "@/hooks/useMenuLinks";
import { useLandingData } from "@/providers/LandingDataProvider";
import SearchDialog from "@/components/drawers/SearchDialog";
import DrawerDialog from "@/components/common/DrawerDialog";

export default function MobileHeader() {
  const { settings } =  useLandingData()

  const dialogs = useDialogs();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  let links = useMenuLinks();

  if (!settings) return <Loader />;

  const handleMenuClick = () => {
    dialogs.open(DrawerDialog, {
      title: "منو",
      links: [],
      children: (
        <List>
          {links.map((link) => (
            <ListItem
              button
              key={link.link || link.label}
              component={Link}
              href={link.link}
              onClick={() => onClose()}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>

              <ListItemText primary={link.label} />
            </ListItem>
          ))}
        </List>
      ),
    });
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "rgba(34,30,16,0.8)",
        backdropFilter: "blur(8px)",
        display: { xs: "flex", md: "none" },
      }}
      color="text.primary"
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: "space-between", width: "100%", height: 64 }}>
        <IconButton color="inherit" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>

        <Link
          href={routes.home.link}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={(settings?.general?.logo?.path)}
            alt={settings?.general?.name}
            width={48}
            height={48}
            unoptimized
            crossOrigin="anonymous"
            sizes="100vw"
            style={{ borderRadius: "50%" }}
          />

          <Typography mr={1} fontWeight="bold" fontSize="1.2rem">
            {settings?.general?.name}
          </Typography>
        </Link>

        <IconButton onClick={() => setSearchDialogOpen(true)} color="inherit">
          <SearchIcon />
        </IconButton>
      </Toolbar>

      <SearchDialog
        open={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
      />
    </AppBar>
  );
}
