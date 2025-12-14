import OrdersPageWrapper from "@/components/wrappers/OrdersPageWrapper";
import React from "react";

export const metadata = {
  title: "مدیریت سفارش‌ها | فروشگاه اینترنتی گالری ساعت وینش",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  
  return <React.Suspense fallback={<div>Loading...</div>}>
    <OrdersPageWrapper />
  </React.Suspense>;
};

export default page;
