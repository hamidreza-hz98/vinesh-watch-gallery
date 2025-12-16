"use client";

import { transformGridQuery } from "@/lib/request";
import QueryString from "qs";
import React from "react";
import Overview from "../common/overview/Overview";
import { orderColumns } from "@/constants/columns";
import { fetchWithAuth } from "@/lib/fetch";
import { getAllOrdersApi } from "@/constants/api.routes";

const OrdersPageWrapper = () => {
  const getOrders = async (params) => {
    try {
      const transformedQuery = transformGridQuery({ ...params });
      const query = QueryString.stringify(transformedQuery);

      const data = await fetchWithAuth(getAllOrdersApi(query));

      console.log(data);
      

      return {
        items: data.orders,
        rowCount: data.total,
      };
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      return {
        items: [],
        rowCount: 0,
      };
    }
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
