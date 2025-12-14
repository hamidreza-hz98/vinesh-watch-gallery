import CustomersPageWrapper from "@/components/wrappers/CustomersPageWrapper";
import React from "react";

export const metadata = {
  title: "لیست مشتریان | فروشگاه اینترنتی گالری ساعت وینش",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <React.Suspense fallback={<div>Loading...</div>}>
    <CustomersPageWrapper />
  </React.Suspense>;
};

export default page;
