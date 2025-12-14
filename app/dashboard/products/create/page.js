import CreateOrUpdateProductPageWrapper from "@/components/wrappers/CreateOrUpdateProductPageWrapper";
import React from "react";

export const metadata = {
  title: "ایجاد / ویرایش محصول | فروشگاه اینترنتی گالری ساعت وینش",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <React.Suspense fallback={<div>Loading...</div>}>
    <CreateOrUpdateProductPageWrapper />
  </React.Suspense>;
};

export default page;
