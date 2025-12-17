"use client";

import { transformGridQuery } from "@/lib/request";
import React from "react";
import Overview from "../common/overview/Overview";
import { customerColumns } from "@/constants/columns";
import CustomerForm from "../forms/CustomerForm";
import { deleteCustomer, getAllCustomers } from "@/app/actions/customer";

const CustomersPageWrapper = () => {
  const getCustomers = async (params) => {
    try {
      const query = transformGridQuery(params);

      const { data } = await getAllCustomers(query);

      return { items: data.customers, rowCount: data.total };
    } catch (error) {
      console.error("Failed to fetch Customers:", error);
      return {
        items: [],
        rowCount: 0,
      };
    }
  };

  const handleDeleteCustomer = async (_id) => {
    const { message } = await deleteCustomer(_id);

    return { success: true, message };
  };

  return (
    <div>
      <Overview
        title="مدیریت مشتریان"
        breadcrumbs={[
          { name: "گالری ساعت وینش" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "مشتریان" },
        ]}
        columns={customerColumns}
        getMany={getCustomers}
        deleteOne={handleDeleteCustomer}
        formMode="drawer"
        FormComponent={CustomerForm}
      />
    </div>
  );
};

export default CustomersPageWrapper;
