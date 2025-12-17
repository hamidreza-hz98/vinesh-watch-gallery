import TermsPageWrapper from '@/components/landing-wrappers/TermsPageWrapper';
import React from 'react'

export const metadata = {
  title: "قوانین و شرایط استفاده - فروشگاه گالری ساعت Vinesh",
  description: "قوانین، مقررات و شرایط استفاده از وبسایت و خدمات فروشگاه گالری ساعت Vinesh.",
  keywords: "قوانین, شرایط استفاده, فروشگاه گالری ساعت Vinesh, نمایندگی رسمی, برند روز",
  robots: "noindex, nofollow",
};

async function getSchema(){
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/seo/terms`)

    if(!res.ok) throw new Error("Failed to fetch Schema");
    const { data } = await res.json()

    return data
  } catch (error) {
    console.error("Fetch Schema error:", error);
  }
}

const page = async () => {
  const schema = await getSchema()
  
  
  return (
    <>
    <TermsPageWrapper />
    
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}

export default page