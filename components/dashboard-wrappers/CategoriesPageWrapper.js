"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { transformGridQuery } from "@/lib/request";
import { categoryColumns } from "@/constants/columns";
import { deleteCategory, getAllCategories } from "@/app/actions/category";

const CategoriesPageWrapper = () => {
  const getCategories = async (params) => {
    const query = transformGridQuery({ ...params });

    const { data } = await getAllCategories(query);

    return {
      items: data.categories,
      rowCount: data.total,
    };
  };

  const handleDeleteCategory = async (_id) => {
    const { message } = await deleteCategory(_id);

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
