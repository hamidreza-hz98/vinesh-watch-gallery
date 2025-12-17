import CustomerOrdersOverviewPageWrapper from '@/components/landing-wrappers/CustomerOrdersOverviewPageWrapper';
import React from 'react'

export const metadata = {
  title: "سفارش‌های من - فروشگاه گالری ساعت Vinesh",
  description: "مشاهده و مدیریت سفارش‌های ثبت شده مشتری در فروشگاه گالری ساعت Vinesh.",
  keywords: "سفارش‌ها, پروفایل, فروشگاه گالری ساعت Vinesh, ساعت, نمایندگی رسمی",
  robots: "noindex, nofollow",
};

const page = () => {
  return (
    <CustomerOrdersOverviewPageWrapper />
  )
}

export default page