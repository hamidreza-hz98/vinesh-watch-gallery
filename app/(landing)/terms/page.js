import TermsPageWrapper from "@/components/landing-wrappers/TermsPageWrapper";
import connectDB from "@/server/db";
import settingsService from "@/server/modules/settings/settings.service";
import React from "react";

export const metadata = {
  title: "قوانین و شرایط استفاده - فروشگاه گالری ساعت Vinesh",
  description:
    "قوانین، مقررات و شرایط استفاده از وبسایت و خدمات فروشگاه گالری ساعت Vinesh.",
  keywords:
    "قوانین, شرایط استفاده, فروشگاه گالری ساعت Vinesh, نمایندگی رسمی, برند روز",
  robots: "noindex, nofollow",
};

async function getSchema() {
  try {
    await connectDB();

    const { data } = await settingsService.getTermsSchema();

    return data;
  } catch (error) {
    console.error("Fetch Schema error:", error);
  }
}

const page = async () => {
  const schema = await getSchema();

  return (
    <>
      <TermsPageWrapper />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
};

export default page;
