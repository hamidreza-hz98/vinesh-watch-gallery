import ContactPageWrapper from "@/components/wrappers/ContactPageWrapper";
import React from "react";

export const metadata = {
  title: "فرم‌های تماس | فروشگاه اینترنتی گالری ساعت وینش",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <React.Suspense fallback={<div>Loading...</div>}>
    <ContactPageWrapper />
  </React.Suspense>;
};

export default page;
