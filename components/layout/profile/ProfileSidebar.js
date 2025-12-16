"use client";

import { Box, Typography, Stack, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { usePathname, customer, useRouter } from "next/navigation";
import nookies from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomerInformation } from "@/store/customer/customer.action";
import Loader from "@/components/common/Loader";
import { selectCustomer } from "@/store/customer/customer.selector";
import routes from "@/constants/landing.routes";

const menuItems = [
  routes.profile,
  routes.profileAddresses,
  routes.profileOrders,
];

const ProfileSidebar = () => {
  const { customer } = nookies.get();
  const dispatch = useDispatch();

  const pathname = usePathname();
  const router = useRouter();

  const customerDetails = useSelector(selectCustomer);

  useEffect(() => {
    dispatch(getCustomerInformation(customer));
  }, [dispatch, customer]);

  const handleLogout = () => {
    // Your logout logic
    router.push("/");
  };

  if (!customer) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: { xs: "static", md: "sticky" },
        top: { md: "100px" },
      }}
    >
      <Box>
        <Box mb={3}>
          <Typography variant="h6" fontWeight={700}>
            {customerDetails?.firstName} {customerDetails?.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            پروفایل کاربری
          </Typography>
        </Box>

        <Stack spacing={1.5}>
          {menuItems.map((item) => {
            const isActive =
              pathname === item.link ||
              (pathname.startsWith(item.link) && item.link !== "/profile");

            return (
              <Link key={item.link} href={item.link}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.3,
                    borderRadius: 2,
                    cursor: "pointer",
                    bgcolor: isActive ? "primary.main" : "transparent",
                    color: isActive ? "primary.contrastText" : "text.primary",
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: isActive ? "primary.main" : "action.hover",
                    },
                  }}
                >
                  {item.icon}
                  <Typography>{item.label}</Typography>
                </Box>
              </Link>
            );
          })}
        </Stack>
      </Box>

      <Button
        fullWidth
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon sx={{ ml: 2, mr: 0 }} />}
        sx={{ mt: 3 }}
        onClick={handleLogout}
      >
        خروج از حساب
      </Button>
    </Box>
  );
};

export default ProfileSidebar;
