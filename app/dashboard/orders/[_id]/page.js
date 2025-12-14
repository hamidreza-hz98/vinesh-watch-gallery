import OrderDetailsPageWrapper from "@/components/wrappers/OrderDetailsPageWrapper";
import React from "react";

export const metadata = {
  title: "جزئیات سفارش | فروشگاه اینترنتی گالری ساعت وینش",
  robots: {
    index: false,
    follow: false,
  },
};

const page = async ({ params }) => {
  const { _id } = await params;

  return <OrderDetailsPageWrapper _id={_id} />;
};

export default page;
