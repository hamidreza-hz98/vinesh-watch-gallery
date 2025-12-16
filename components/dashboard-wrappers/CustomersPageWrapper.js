"use client";

import { transformGridQuery } from "@/lib/request";
import QueryString from "qs";
import React from "react";
import Overview from "../common/overview/Overview";
import { customerColumns } from "@/constants/columns";
import CustomerForm from "../forms/CustomerForm";
import { fetchWithAuth } from "@/lib/fetch";
import { getAllCustomersApi, modifyCustomerApi } from "@/constants/api.routes";

const CustomersPageWrapper = () => {
  const getCustomers = async (params) => {
   try {
     const transformedQuery = transformGridQuery(params);
     const query = QueryString.stringify(transformedQuery);
 
     const data  = await fetchWithAuth(getAllCustomersApi(query));

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
    const { message } = await fetchWithAuth(modifyCustomerApi(_id), {
      method: "DELETE",
    });

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
