"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { transformGridQuery } from "@/lib/request";
import QueryString from "qs";
import { categoryColumns } from "@/constants/columns";
import { fetchWithAuth } from "@/lib/fetch";
import { getAllCategoriesApi, modifyCategoryApi } from "@/constants/api.routes";

const CategoriesPageWrapper = () => {
  const getCategories = async (params) => {
    const transformedQuery = transformGridQuery({ ...params });
    const query = QueryString.stringify(transformedQuery);

    const { categories, total } = await fetchWithAuth(getAllCategoriesApi(query));

    return {
      items: categories,
      rowCount: total,
    };
  };

  const handleDeleteCategory = async (_id) => {
    const { message } = await fetchWithAuth(modifyCategoryApi(_id), {
      method: "DELETE",
    });

    return { success: true, message };
  };

  return (
    <div>
      <Overview
        title="مدیریت دسته بندی ها"
        breadcrumbs={[
          { name: "گالری ساعت وینش" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "دسته بندی ها" },
        ]}
        columns={categoryColumns}
        getMany={getCategories}
        deleteOne={handleDeleteCategory}
      />
    </div>
  );
};

export default CategoriesPageWrapper;
