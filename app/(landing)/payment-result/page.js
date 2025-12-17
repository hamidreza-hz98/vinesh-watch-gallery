import PaymentResultPageWrapper from '@/components/landing-wrappers/PaymentResultPageWrapper';
import React from 'react'

export const metadata = {
  title: "نتیجه پرداخت - فروشگاه گالری ساعت Vinesh",
  description: "نمایش نتیجه تراکنش و پرداخت مشتری در فروشگاه گالری ساعت Vinesh.",
  keywords: "پرداخت, نتیجه تراکنش, فروشگاه گالری ساعت Vinesh, ساعت, نمایندگی رسمی",
  robots: "noindex, nofollow",
};

const page = () => {
  return (
    <PaymentResultPageWrapper />
  )
}

export default page