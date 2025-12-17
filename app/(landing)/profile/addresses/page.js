import CustomerAddressPageWrapper from '@/components/landing-wrappers/CustomerAddressPageWrapper';
import React from 'react'

export const metadata = {
  title: "آدرس‌های من - فروشگاه گالری ساعت Vinesh",
  description: "مدیریت و ویرایش آدرس‌های ثبت شده مشتری در فروشگاه گالری ساعت Vinesh.",
  keywords: "آدرس‌ها, پروفایل, فروشگاه گالری ساعت Vinesh, ساعت, نمایندگی رسمی",
  robots: "noindex, nofollow",
};

const page = () => {
  return (
    <CustomerAddressPageWrapper />
  )
}

export default page