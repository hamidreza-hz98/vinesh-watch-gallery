import ProductDetailsPageWrapper from "@/components/landing-wrappers/ProductDetailsPageWrapper";
import connectDB from "@/server/db";
import productService from "@/server/modules/product/product.service";
import React from "react";

let productSchema = {};

async function fetchSeoData(slug) {
  try {
    await connectDB()
    
    const { seo, schema } = await productService.getSeoData({ slug });

    productSchema = schema;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      robots: "noindex, nofollow",
      // seo.robots,
      canonical: seo.canonical,
      additionalMetaTags: seo.additionalMetaTags,
      openGraph: {
        title: seo.ogTitle || seo.title,
        description: seo.ogDescription || seo.description,
        url: seo.canonical,
        images: seo.ogImage ? [`${baseUrl}${seo.ogImage.path}`] : [],
        siteName: "گالری ساعت Vinesh",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seo.twitterTitle || seo.title,
        description: seo.twitterDescription || seo.description,
        images: seo.twitterImage ? [`${baseUrl}${seo.twitterImage.path}`] : [],
      },
    };
  } catch (error) {
    console.error("Fetch SEO data error:", error);
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return await fetchSeoData(slug);
}

const page = async ({ params }) => {
  const { slug } = await params;

  return (
    <>
      <ProductDetailsPageWrapper slug={slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
};

export default page;
