import CustomerOrderDetailsPageWrapper from "@/components/landing-wrappers/CustomerOrderDetailsPageWrapper";
import React from "react";

export const metadata = {
  title: "جزئیات سفارش - فروشگاه گالری ساعت Vinesh",
  description: "مشاهده جزئیات سفارش مشتری شامل محصولات و وضعیت تحویل در فروشگاه گالری ساعت Vinesh.",
  keywords: "جزئیات سفارش, پروفایل, فروشگاه گالری ساعت Vinesh, ساعت, نمایندگی رسمی",
  robots: "noindex, nofollow",
};


const page = async ({ params }) => {
  const { code } = await params;

  return <CustomerOrderDetailsPageWrapper code={code} />;
};

export default page;
