import CategoriesPageWrapper from '@/components/wrappers/CategoriesPageWrapper'
import React from 'react'

export const metadata = {
  title: "مدیریت دسته‌بندی‌ها | فروشگاه اینترنتی گالری ساعت وینش",
};

const page = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CategoriesPageWrapper />
    </React.Suspense>
  );
}

export default page