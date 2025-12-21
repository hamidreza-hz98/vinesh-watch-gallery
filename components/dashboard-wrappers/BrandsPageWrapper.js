"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { brandColumns } from "@/constants/columns";
import { transformGridQuery } from "@/lib/request";
import { deleteBrand, getAllBrands } from "@/app/actions/brand";

const BrandsPageWrapper = () => {
  const getBrands = async (params) => {
    try {
      const query = transformGridQuery({ ...params });
      
      const { data } = await getAllBrands(query)
      
      return {
        items: data.brands,
        rowCount: data.total,
      };
    } catch (error) {
      console.error("Failed to fetch brands:", error);
      return {
        items: [],
        rowCount: 0,
      };
    }
  };

  const handleDeleteBrand = async (_id) => {
    const { message } = await deleteBrand(_id)

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
