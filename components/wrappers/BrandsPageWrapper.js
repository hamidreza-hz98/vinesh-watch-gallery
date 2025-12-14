"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { brandColumns } from "@/constants/columns";
import { useDispatch } from "react-redux";
import { deleteBrand, getAllBrands } from "@/store/brand/brand.action";
import { transformGridQuery } from "@/lib/request";
import QueryString from "qs";

const BrandsPageWrapper = () => {
  const dispatch = useDispatch();

  const getBrands = async (params) => {
    const query = transformGridQuery({ ...params });

    const data = await dispatch(
      getAllBrands(QueryString.stringify(query, { encodedValuesOnly: true }))
    ).unwrap();

    return {
      items: data.brands,
      rowCount: data.total,
    };
  };

  const handleDeleteBrand = async (_id) => {
    const message = await dispatch(deleteBrand(_id)).unwrap();

    return { success: true, message };
  };

  return (
    <div>
      <Overview
        title="مدیریت برند ها"
        breadcrumbs={[
          { name: "گالری ساعت وینش" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "برند ها" },
        ]}
        columns={brandColumns}
        getMany={getBrands}
        deleteOne={handleDeleteBrand}
      />
    </div>
  );
};

export default BrandsPageWrapper;
