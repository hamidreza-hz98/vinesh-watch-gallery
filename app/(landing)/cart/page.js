import CartPageWrapper from '@/components/landing-wrappers/CartPageWrapper';
import React from 'react'

export const metadata = {
  title: "سبد خرید - فروشگاه گالری ساعت Vinesh",
  description: "مشاهده و مدیریت محصولات موجود در سبد خرید مشتری در فروشگاه گالری ساعت Vinesh.",
  keywords: "سبد خرید, فروشگاه گالری ساعت Vinesh, ساعت, نمایندگی رسمی",
  robots: "noindex, nofollow",
};

const page = () => {
  return (
    <CartPageWrapper />
  )
}

export default page