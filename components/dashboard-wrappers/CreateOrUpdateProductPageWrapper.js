"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QueryString from "qs";

import useNotifications from "@/hooks/useNotifications/useNotifications";
import { purifyData } from "@/lib/request";

import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import ProductForm from "../forms/ProductForm";
import { fetchWithAuth } from "@/lib/fetch";
import { productApi, productDetailsApi } from "@/constants/api.routes";

const CreateOrUpdateProductPageWrapper = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const notifications = useNotifications();

  const _id = searchParams.get("_id");
  const [productDetails, setProductDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  /* ---------------------------------- */
  /* LOAD PRODUCT (EDIT MODE) */
  /* ---------------------------------- */
  const loadData = React.useCallback(async () => {
    if (!_id) return;

    try {
      setLoading(true);

      const query = QueryString.stringify({ _id });

      const res = await fetchWithAuth(productDetailsApi(query));

      setProductDetails(res.data);
    } catch (error) {
      notifications.show(error.message || "خطا در دریافت اطلاعات محصول", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [_id, notifications]);

  /* ---------------------------------- */
  /* CREATE OR UPDATE */
  /* ---------------------------------- */
  const handleCreateOrUpdateProduct = async (product) => {
    try {
      const body = purifyData(product, [
        "tags",
        "relatedProducts",
        "categories",
        "brand",
        "media",
        "seo.ogImage",
        "seo.twitterImage",
      ]);

      const res = _id
        ? await fetchWithAuth(`/api/product/${_id}`, {
            method: "PUT",
            body,
          })
        : await fetchWithAuth("/api/product", {
            method: "POST",
            body,
          });

      notifications.show(res.message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/products");
    } catch (error) {
      notifications.show(error.message || "خطا در ثبت محصول", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  /* ---------------------------------- */
  /* EFFECT */
  /* ---------------------------------- */
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  if (_id && (loading || !productDetails)) {
    return <Loader />;
  }

  return (
    <PageContainer
      title="مشخصات محصول:"
      breadcrumbs={[
        { name: "گالری ساعت وینش" },
        { name: "داشبورد", path: "/dashboard" },
        { name: "محصولات", path: "/dashboard/products" },
        { name: _id ? "ویرایش محصول" : "ساخت محصول جدید" },
      ]}
    >
      <ProductForm
        onSubmit={handleCreateOrUpdateProduct}
        data={productDetails}
        mode={_id ? "edit" : "create"}
      />
    </PageContainer>
  );
};

export default CreateOrUpdateProductPageWrapper;
