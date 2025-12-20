"use client";

import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import routes from "@/constants/landing.routes";
import nookies from "nookies";
import AuthenticationDrawer from "@/components/drawers/AuthenticationDrawer";
import Loader from "../../common/Loader";
import { toPersian } from "@/lib/number";
import { useLandingData } from "@/providers/LandingDataProvider";

export default function MobileBottomNav() {
  const { cart } = useLandingData();
  const [openAuth, setOpenAuth] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(0);

  const { token, customer } = nookies.get();

  const handleClickProfile = () => {
    if (customer && token) {
      router.push("/profile");
    } else {
      setOpenAuth(true);
    }
  };

  // Set selected index based on current pathname
  useEffect(() => {
    const currentIndex = [
      routes.home,
      routes.products,
      routes.cart,
      routes.profile,
    ].findIndex((item) => pathname === item.link);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (currentIndex !== -1) setValue(currentIndex);
  }, [pathname]);

  const handleChange = (_, newValue) => {
    if (newValue === 3) {
      return handleClickProfile();
    }

    setValue(newValue);
    router.push(
      [routes.home, routes.products, routes.cart, routes.profile][newValue].link
    );
  };

  if (!cart) {
    return <Loader />;
  }

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 10,
        display: { xs: "block", md: "none" },
        bgcolor: "rgba(18,18,18,0.8)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
      elevation={0}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{ bgcolor: "transparent" , "& .Mui-selected": { color: "primary.main", fontSize: "11px" }, color: "grey.400" }}
      >
        {[routes.home, routes.products, routes.cart, routes.profile].map(
          (item, index) => {
            const isCart = index === 2; // cart route index
            const cartCount = cart?.products?.length || 0; // example — replace with your real cart count state

            return (
              <BottomNavigationAction
                key={index}
                label={item.label}
                icon={
                  isCart ? (
                    <Badge
                      badgeContent={toPersian(cartCount)}
                      color="primary"
                      invisible={cartCount === 0}
                    >
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )
                }
              />
            );
          }
        )}
      </BottomNavigation>

      <AuthenticationDrawer
        open={openAuth}
        onClose={() => setOpenAuth(false)}
        onAuthenticated={() => {
          setOpenAuth(false);
        }}
      />
    </Paper>
  );
}
