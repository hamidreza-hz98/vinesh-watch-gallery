"use client";

import useNotifications from "@/hooks/useNotifications/useNotifications";
import { purifyData } from "@/lib/request";
import { useRouter, useSearchParams } from "next/navigation";
import QueryString from "qs";
import React from "react";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import BrandForm from "../forms/BrandForm";
import { createBrand, getBrandDetails, updateBrand } from "@/app/actions/brand";

const CreateOrUpdateBrandPageWrapper = () => {
  const [brandDetails, setBrandDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const notifications = useNotifications();

  const _id = searchParams.get("_id");

  const loadData = React.useCallback(async () => {
    if (!_id) return;

    try {
      setLoading(true);

      const { data } = await getBrandDetails({ _id });

      setBrandDetails(data);
    } catch (error) {
      notifications.show(error.message || "خطا در دریافت اطلاعات برند", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [_id, notifications]);

  const handleCreateOrUpdateBrand = async (brand) => {
    try {
      const body = purifyData(brand, [
        "tags",
        "logo",
        "seo.ogImage",
        "seo.twitterImage",
      ]);

      const { message } = _id
        ? await updateBrand(_id, body)
        : await createBrand(body);

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/brands");
    } catch (error) {
      notifications.show(error.message, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  if (_id && (loading || !brandDetails)) {
    return <Loader />;
  }

  return (
    <PageContainer
      title="مشخصات برند:"
      breadcrumbs={[
        { name: "گالری ساعت وینش" },
        { name: "داشبورد", path: "/dashboard" },
        { name: "برند ها", path: "/dashboard/brands" },
        { name: _id ? "ویرایش برند" : "ساخت برند جدید" },
      ]}
    >
      <BrandForm
        onSubmit={handleCreateOrUpdateBrand}
        data={brandDetails || null}
        mode={_id ? "edit" : "create"}
      />
    </PageContainer>
  );
};

export default CreateOrUpdateBrandPageWrapper;
