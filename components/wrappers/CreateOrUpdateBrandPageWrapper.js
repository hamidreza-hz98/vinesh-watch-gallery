"use client";

import useNotifications from "@/hooks/useNotifications/useNotifications";
import { purifyData } from "@/lib/request";
import {
  createBrand,
  getBrandDetails,
  updateBrand,
} from "@/store/brand/brand.action";
import { selectBrand } from "@/store/brand/brand.selector";
import { useRouter, useSearchParams } from "next/navigation";
import QueryString from "qs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import PageContainer from "../common/PageContainer";
import BrandForm from "../forms/BrandForm";

const CreateOrUpdateBrandPageWrapper = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const brandDetails = useSelector(selectBrand);
  const notifications = useNotifications();

  const _id = searchParams.get("id");

  const loadData = React.useCallback(async () => {
    if (_id) {
      const query = { _id };

      await dispatch(getBrandDetails(QueryString.stringify(query))).unwrap();
    }
  }, [dispatch, _id]);

  const handleCreateOrUpdateBrand = async (brand) => {
    try {
      const body = purifyData(brand, ["tags", "logo"]);

      const message = _id
        ? await dispatch(updateBrand({ _id, body })).unwrap()
        : await dispatch(createBrand(body)).unwrap();

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/brands");
    } catch (error) {
      notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (!brandDetails) {
    return <Loader />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <PageContainer  title="مشخصات برند:"
        breadcrumbs={[
          { name: "گالری ساعت وینش" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "برند ها", path: "/dashboard/brands" },
          { name: _id ? "ویرایش برند" : "ساخت برند جدید" },
        ]} >
      <BrandForm
        onSubmit={handleCreateOrUpdateBrand}
        data={brandDetails || null}
        mode={_id ? "edit" : "create"}
      />
    </PageContainer>
  );
};

export default CreateOrUpdateBrandPageWrapper;
