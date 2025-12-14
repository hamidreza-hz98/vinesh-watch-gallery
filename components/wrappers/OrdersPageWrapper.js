"use client";

import { transformGridQuery } from "@/lib/request";
import { getAllOrders } from "@/store/order/order.action";
import QueryString from "qs";
import React from "react";
import { useDispatch } from "react-redux";
import Overview from "../common/overview/Overview";
import { orderColumns } from "@/constants/columns";

const OrdersPageWrapper = () => {
  const dispatch = useDispatch();

  const getOrders = async (params) => {
    const query = transformGridQuery({ ...params });

    const data = await dispatch(
      getAllOrders(QueryString.stringify(query, { encodedValuesOnly: true }))
    ).unwrap();

    return {
      items: data.orders,
      rowCount: data.total,
    };
  };

  return (
    <div>
      <Overview
        title="مدیریت سفارش ها"
        breadcrumbs={[
          { name: "گالری ساعت وینش" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "سفارش ها" },
        ]}
        columns={orderColumns}
        getMany={getOrders}
        rowActions={["details"]}
      />
    </div>
  );
};

export default OrdersPageWrapper;
