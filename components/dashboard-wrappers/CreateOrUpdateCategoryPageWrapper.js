"use client";

import useNotifications from "@/hooks/useNotifications/useNotifications";
import { purifyData } from "@/lib/request";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import CategoryForm from "../forms/CategoryForm";
import { createCategory, getCategoryDetails, updateCategory } from "@/app/actions/category";

const CreateOrUpdateCategoryPageWrapper = () => {
  const [categoryDetails, setCategoryDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const notifications = useNotifications();

  const _id = searchParams.get("_id");

  const loadData = React.useCallback(async () => {
    if (!_id) return;

    try {
      setLoading(true);

      const { data } = await getCategoryDetails({_id})

      setCategoryDetails(data);
    } catch (error) {
      console.log(error)

      notifications.show(error.message || "خطا در دریافت اطلاعات محصول", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [_id, notifications]);

  const handleCreateOrUpdateCategory = async (category) => {
    try {
      const body = purifyData(category, [
        "tags",
        "children",
        "image",
        "seo.ogImage",
        "seo.twitterImage",
      ]);

      const { message } = _id
        ? await updateCategory(_id, body)
        : await createCategory(body)

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/categories");
    } catch (error) {
      notifications.show(error.message || "مشکلی پیش آمد", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  if (_id && (loading || !categoryDetails)) {
    return <Loader />;
  }

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
