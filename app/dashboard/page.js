import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import React from "react";

export const metadata = {
  title: "داشبورد مدیریت | فروشگاه اینترنتی گالری ساعت وینش",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <React.Suspense fallback={<div>Loading...</div>}>
    <DashboardPageWrapper />
  </React.Suspense>;
};

export default page;
