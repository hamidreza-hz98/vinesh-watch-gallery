"use client";

import useNotifications from "@/hooks/useNotifications/useNotifications";
import { purifyData } from "@/lib/request";
import {
  createCategory,
  getCategoryDetails,
  updateCategory,
} from "@/store/category/category.action";
import { selectCategory } from "@/store/category/category.selector";
import { useRouter, useSearchParams } from "next/navigation";
import QueryString from "qs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import CategoryForm from "../forms/CategoryForm";

const CreateOrUpdateCategoryPageWrapper = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const categoryDetails = useSelector(selectCategory);
  const notifications = useNotifications();

  const _id = searchParams.get("id");

  const loadData = React.useCallback(async () => {
    if (_id) {
      const query = { _id };

      await dispatch(getCategoryDetails(QueryString.stringify(query))).unwrap();
    }
  }, [dispatch, _id]);

  const handleCreateOrUpdateCategory = async (category) => {
    try {
      const body = purifyData(category, ["tags", "children", "image", "seo.ogImage", "seo.twitterImage"]);

      const message = _id
        ? await dispatch(updateCategory({ _id, body })).unwrap()
        : await dispatch(createCategory(body)).unwrap();

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/categories");
    } catch (error) {
      notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (!categoryDetails) {
    return <Loader />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <PageContainer
      title="مشخصات دسته بندی:"
      breadcrumbs={[
        { name: "گالری ساعت وینش" },
        { name: "داشبورد", path: "/dashboard" },
        { name: "دسته بندی ها", path: "/dashboard/categories" },
        { name: _id ? "ویرایش دسته بندی" : "ساخت دسته بندی جدید" },
      ]}
    >
      <CategoryForm
        onSubmit={handleCreateOrUpdateCategory}
        data={categoryDetails || null}
        mode={_id ? "edit" : "create"}
      />
    </PageContainer>
  );
};

export default CreateOrUpdateCategoryPageWrapper;
