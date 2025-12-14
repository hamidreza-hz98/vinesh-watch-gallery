import CreateOrUpdateCategoryPageWrapper from "@/components/wrappers/CreateOrUpdateCategoryPageWrapper";
import React from "react";

export const metadata = {
  title: "ایجاد / ویرایش دسته‌بندی | فروشگاه اینترنتی گالری ساعت وینش",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CreateOrUpdateCategoryPageWrapper />
    </React.Suspense>
  );
};

export default page;
