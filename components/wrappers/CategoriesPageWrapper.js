"use client"

import React from "react";
import Overview from "../common/overview/Overview";
import { useDispatch } from "react-redux";
import { transformGridQuery } from "@/lib/request";
import QueryString from "qs";
import { deleteCategory, getAllCategories } from "@/store/category/category.action";
import { categoryColumns } from "@/constants/columns";

const CategoriesPageWrapper = () => {
  const dispatch = useDispatch();

  const getCategories = async (params) => {
    const query = transformGridQuery({ ...params });

    const data = await dispatch(
      getAllCategories(
        QueryString.stringify(query, { encodedValuesOnly: true })
      )
    ).unwrap();

    return {
      items: data.categories,
      rowCount: data.total,
    };
  };

  const handleDeleteCategory = async (_id) => {
    const message = await dispatch(deleteCategory(_id)).unwrap();

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
