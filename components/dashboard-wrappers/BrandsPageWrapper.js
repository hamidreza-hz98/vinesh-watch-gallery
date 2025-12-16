"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { brandColumns } from "@/constants/columns";
import { transformGridQuery } from "@/lib/request";
import QueryString from "qs";
import { fetchWithAuth } from "@/lib/fetch";
import { getAllBrandsApi, modifyBrandApi } from "@/constants/api.routes";

const BrandsPageWrapper = () => {
  const getBrands = async (params) => {
    try {
      const transformedQuery = transformGridQuery({ ...params });
      const query = QueryString.stringify(transformedQuery);

      const data = await fetchWithAuth(getAllBrandsApi(query));

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
    const { message } = await fetchWithAuth(modifyBrandApi(_id), {
      method: "DELETE",
    });

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
