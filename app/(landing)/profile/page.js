import CustomerInformationPageWrapper from '@/components/landing-wrappers/CustomerInformationPageWrapper';
import React from 'react'

export const metadata = {
  title: "اطلاعات مشتری - فروشگاه گالری ساعت Vinesh",
  description: "مدیریت اطلاعات شخصی و پروفایل مشتری در فروشگاه گالری ساعت Vinesh.",
  keywords: "پروفایل, اطلاعات مشتری, فروشگاه گالری ساعت Vinesh, نمایندگی رسمی, ساعت",
  robots: "noindex, nofollow",
};

const page = () => {
  return (
    <CustomerInformationPageWrapper />
  )
}

export default page