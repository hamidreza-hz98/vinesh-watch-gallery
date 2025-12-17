import FaqPageWrapper from '@/components/landing-wrappers/FaqPageWrapper';
import React from 'react'

export const metadata = {
  title: "سوالات متداول - فروشگاه گالری ساعت Vinesh",
  description: "پرسش و پاسخ‌های متداول مشتریان فروشگاه گالری ساعت Vinesh درباره محصولات و خدمات.",
  keywords: "سوالات متداول, FAQ, فروشگاه گالری ساعت Vinesh, ساعت, نمایندگی رسمی",
  robots: "noindex, nofollow",
};

async function getSchema(){
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/seo/faq`)

    if(!res.ok) throw new Error("Failed to fetch Schema");
    const { data } = await res.json()

    return data
  } catch (error) {
    console.error("Fetch Schema error:", err);
  }
}

const page = async () => {
  const schema = await getSchema()
  
  return (
    <>
    <FaqPageWrapper />
    
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}

export default page