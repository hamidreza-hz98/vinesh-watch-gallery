"use client";

import { transformGridQuery } from "@/lib/request";
import {
  deleteCustomer,
  getAllCustomers,
} from "@/store/customer/customer.action";
import QueryString from "qs";
import React from "react";
import { useDispatch } from "react-redux";
import Overview from "../common/overview/Overview";
import { customerColumns } from "@/constants/columns";
import CustomerForm from "../forms/CustomerForm";

const CustomersPageWrapper = () => {
  const dispatch = useDispatch();

  const getCustomers = async (params) => {
    const query = transformGridQuery(params);

    const data = await dispatch(
      getAllCustomers(QueryString.stringify(query, { encodeValuesOnly: true }))
    ).unwrap();

    return { items: data.customers, rowCount: data.total };
  };

  const handleDeleteCustomer = async (_id) => {
    const message = await dispatch(deleteCustomer(_id)).unwrap();

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
