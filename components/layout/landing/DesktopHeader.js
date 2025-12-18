"use client";

import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Badge,
  Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import Loader from "../../common/Loader";
import Image from "next/image";
import routes from "@/constants/landing.routes";
import SearchDialog from "@/components/drawers/SearchDialog";
import { useRouter, useSearchParams } from "next/navigation";
import { toPersian } from "@/lib/number";
import nookies from "nookies";
import AuthenticationDrawer from "@/components/drawers/AuthenticationDrawer";
import DesktopMegaMenu from "./DesktopMegaMenu";
import { useLandingData } from "@/providers/LandingDataProvider";

export default function DesktopHeader() {
  const [openAuth, setOpenAuth] = useState(false);

  const { categories, settings, cart } = useLandingData();

  const { token, customer } = nookies.get();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const handleClickProfile = () => {
    if (customer && token) {
      router.push("/profile");
    } else {
      setOpenAuth(true);
    }
  };

  if (!categories || !cart || !settings) {
    return <Loader />;
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "rgba(18,18,18,0.8)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: 50,
      }}
      elevation={0}
    >
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Toolbar
          sx={{
            height: 80,
            display: { xs: "none", md: "flex" },
            justifyContent: "space-between",
            height: "100%",
            padding: "8px 0px !important",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Link
              href={routes.home.link}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
              }}
            >
              <Image
                src={settings?.general?.logo?.path}
                alt={settings?.general?.name}
                width={64}
                height={64}
                unoptimized
                crossOrigin="anonymous"
                sizes="100vw"
                style={{ borderRadius: "50%" }}
              />

              <Typography mr={1} fontWeight="bold" fontSize="1.2rem">
                {settings?.general?.name}
              </Typography>
            </Link>

            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                height: "100%",
              }}
            >
              <Link
                href={routes.products.link}
                underline="none"
                sx={{
                  color: "text.primary",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "color 0.2s",
                  "&:hover": { color: "primary.main" },
                }}
              >
                همه ی محصولات
              </Link>

              <DesktopMegaMenu
                categories={categories}
                searchParams={searchParams}
              />

              {[routes.about, routes.contact, routes.faq].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  underline="none"
                  sx={{
                    color: "text.primary",
                    fontSize: 14,
                    fontWeight: 500,
                    transition: "color 0.2s",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              sx={{
                bgcolor: "grey.700",
                color: "white",
                "&:hover": { bgcolor: "primary.main", color: "black" },
              }}
              onClick={() => setSearchDialogOpen(true)}
            >
              <SearchIcon />
            </IconButton>

            <IconButton
              sx={{
                bgcolor: "grey.700",
                color: "white",
                "&:hover": { bgcolor: "primary.main", color: "black" },
              }}
              LinkComponent={Link}
              href="/cart"
            >
              <Badge
                badgeContent={toPersian(cart?.products?.length)}
                invisible={!cart?.products || cart?.products?.length === 0}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              sx={{
                bgcolor: "grey.700",
                color: "white",
                "&:hover": { bgcolor: "primary.main", color: "black" },
              }}
              onClick={handleClickProfile}
            >
              <PersonOutlineIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <SearchDialog
        open={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
      />

      <AuthenticationDrawer
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        onAuthenticated={() => {
          setOpenAuth(false);
        }}
      />
    </AppBar>
  );
}
