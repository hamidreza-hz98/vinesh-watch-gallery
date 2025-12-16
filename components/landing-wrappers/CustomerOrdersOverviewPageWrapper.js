"use client";

import { getCustomerOrders } from "@/store/order/order.action";
import { selectOrder, selectOrders } from "@/store/order/order.selector";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import nookies from "nookies";
import { useSearchParams } from "next/navigation";
import { setRequestQuery } from "@/lib/request";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { orderStatuses } from "@/constants/general";
import NoDataAvailable from "../common/NoDataAvailable";
import OrderCard from "../cards/OrderCard";
import CustomPagination from "../filter/CustomPagination";

const CustomerOrdersOverviewPageWrapper = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const page_size = searchParams.get("page_size") || 12;

  const orders = useSelector(selectOrders);
  const { customer } = nookies.get();

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
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

    dispatch(getCustomerOrders({ _id: customer, query })).unwrap();
  }, [dispatch, customer, searchParams, statusFilter, page, page_size]);

  const statusOptions = [
    { key: "all", label: "همه سفارش‌ها" },
    ...Object.entries(orderStatuses).map(([key, value]) => ({
      key,
      label: value.name,
      color: value.color,
      icon: value.icon,
    })),
  ];

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
