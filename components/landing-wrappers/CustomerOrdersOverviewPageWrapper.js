"use client";

import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { useSearchParams } from "next/navigation";
import { setRequestQuery } from "@/lib/request";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { orderStatuses } from "@/constants/general";
import NoDataAvailable from "@/components/common/NoDataAvailable";
import OrderCard from "@/components/cards/OrderCard";
import CustomPagination from "@/components/filter/CustomPagination";
import { fetchWithAuth } from "@/lib/fetch";
import { customerOrdersApi } from "@/constants/api.routes";
import Loader from "../common/Loader";

const CustomerOrdersOverviewPageWrapper = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const page_size = searchParams.get("page_size") || 12;

  const { customer } = nookies.get();

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const query = setRequestQuery({
          filters:
            statusFilter === "all"
              ? {}
              : {
                  status: {
                    value: statusFilter,
                    type: "eq",
                  },
                },
          page,
          page_size,
        });

        const { data } = await fetchWithAuth(
          customerOrdersApi(customer, query)
        );

        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customer, searchParams, statusFilter, page, page_size]);

  const statusOptions = [
    { key: "all", label: "همه سفارش‌ها" },
    ...Object.entries(orderStatuses).map(([key, value]) => ({
      key,
      label: value.name,
      color: value.color,
      icon: value.icon,
    })),
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Tabs
        value={statusFilter}
        onChange={(e, newValue) => setStatusFilter(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {statusOptions.map((item) => (
          <Tab
            key={item.key}
            value={item.key}
            label={item.label}
            icon={item.icon || null}
            iconPosition="start"
            sx={{
              "& .MuiTab-iconWrapper": {
                color: theme.palette.text.secondary,
                mr: 0,
                ml: 1,
              },

              "&.Mui-selected": {
                color: theme.palette.primary.main,

                "& .MuiTab-iconWrapper": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          />
        ))}
      </Tabs>

      <Box>
        {orders?.orders && orders?.orders?.length !== 0 ? (
          orders?.orders?.map((order) => (
            <OrderCard key={order.code} order={order} />
          ))
        ) : (
          <NoDataAvailable
            text="سفارشی یافت نشد"
            clickText="مشاهده همه سفارش ها"
            onClick={() => setStatusFilter("all")}
          />
        )}
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        size={{ xs: 12 }}
      >
        <CustomPagination
          page={page}
          page_size={page_size}
          total={orders?.total}
        />
      </Box>
    </Box>
  );
};

export default CustomerOrdersOverviewPageWrapper;
