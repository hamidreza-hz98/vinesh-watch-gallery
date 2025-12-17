import { Box } from "@mui/material";
import LandingThemeProvider from "@/theme/providers/LandingThemeProvider";
import DesktopHeader from "@/components/layout/landing/DesktopHeader";
import MobileHeader from "@/components/layout/landing/MobileHeader";
import Footer from "@/components/layout/landing/Footer";
import MobileBottomNav from "@/components/layout/landing/MobileBottomNav";
import { getLandingData } from "@/lib/landing-data";
import LandingDataProvider from "@/providers/LandingDataProvider";
import settingsService from "@/server/modules/settings/settings.service";
import connectDB from "@/server/db";

async function getDefaultSeo() {
  try {
    await connectDB();

    const { data } = await settingsService.getDefaultSeo();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return {
      title: data?.title || "امریان واچ",
      description: data?.description || "فروشگاه اینترنتی گالری ساعت Vinesh",
      keywords: data?.keywords || "",
      robots:
        // data?.robots ||
        "noindex, nofollow",
      canonical: data?.canonical || baseUrl,
      additionalMetaTags: data?.additionalMetaTags || "",
      openGraph: {
        title: data?.ogTitle || data?.title,
        description: data?.ogDescription || data?.description,
        url: data?.canonical || baseUrl,
        images: data?.ogImage ? [`${baseUrl}${data?.ogImage.path}`] : [],
        siteName: "Your Site Name",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: data?.twitterTitle || data?.title,
        description: data?.twitterDescription || data?.description,
        images: data?.twitterImage
          ? [`${baseUrl}${data?.twitterImage.path}`]
          : [],
      },
    };
  } catch (err) {
    console.error("SEO fetch error:", err);
    return {
      title: "Default Title",
      description: "Default description",
      keywords: "",
      robots: "noindex, nofollow",
      canonical: process.env.NEXT_PUBLIC_BASE_URL,
      additionalMetaTags: "",
      openGraph: {
        title: "Default Title",
        description: "Default description",
        url: process.env.NEXT_PUBLIC_BASE_URL,
        images: [],
        siteName: "Your Site Name",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Default Title",
        description: "Default description",
        images: [],
      },
    };
  }
}

export async function generateMetadata() {
  return await getDefaultSeo();
}

export default async function RootLayout({ children }) {
  const landingData = await getLandingData();

  return (
    <html lang="fa" dir="rtl">
      {/* <Head>
        <link rel="manifest" href="/images/favicon/manifest.json" />
        <meta
          name="msapplication-TileImage"
          content="/images/favicon/ms-icon-144x144.png"
        />
      </Head> */}

      <body>
        <LandingThemeProvider>
          <LandingDataProvider data={landingData}>
            <DesktopHeader />
            <MobileHeader />
            <Box component="main">{children}</Box>
            <Footer />
            <MobileBottomNav />
          </LandingDataProvider>
        </LandingThemeProvider>
      </body>
    </html>
  );
}
