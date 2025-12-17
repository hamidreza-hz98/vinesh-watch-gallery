import FaqPageWrapper from "@/components/landing-wrappers/FaqPageWrapper";
import connectDB from "@/server/db";
import settingsService from "@/server/modules/settings/settings.service";
import React from "react";

export const metadata = {
  title: "سوالات متداول - فروشگاه گالری ساعت Vinesh",
  description:
    "پرسش و پاسخ‌های متداول مشتریان فروشگاه گالری ساعت Vinesh درباره محصولات و خدمات.",
  keywords:
    "سوالات متداول, FAQ, فروشگاه گالری ساعت Vinesh, ساعت, نمایندگی رسمی",
  robots: "noindex, nofollow",
};

async function getSchema() {
  try {
    await connectDB();

    const schema = await settingsService.getFaqSchema();

    return schema;
  } catch (error) {
    console.error("Fetch Schema error:", err);
  }
}

const page = async () => {
  const schema = await getSchema();

  return (
    <>
      <FaqPageWrapper />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
};

export default page;
