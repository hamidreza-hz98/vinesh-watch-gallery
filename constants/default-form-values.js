export const seoDefaultValues = (data) => ({
  title: data?.seo?.title || "",
  description: data?.seo?.description || "",
  keywords: data?.seo?.keywords || "",
  ogTitle: data?.seo?.ogTitle || "",
  ogDescription: data?.seo?.ogDescription || "",
  ogImage: data?.seo?.ogImage || "",
  twitterTitle: data?.seo?.twitterTitle || "",
  twitterDescription: data?.seo?.twitterDescription || "",
  twitterImage: data?.seo?.twitterImage || "",
  canonical: data?.seo?.canonical || "",
  robots: data?.seo?.robots || "",
  additionalMetaTags: data?.seo?.additionalMetaTags || "",
});

export const mediaDefaultValues = (data) => ({
  _id: data?._id || null,

  file: data
    ? { path: data?.path, type: data?.type, mimeType: data?.mimeType }
    : null,

  title: data?.title || "",
  description: data?.description || "",

  seoTitle: data?.seoTitle || "",
  seoDescription: data?.seoDescription || "",
  seoKeywords: data?.seoKeywords?.split?.(",")?.map((k) => k.trim()) || [],

  mediaAlt: data?.mediaAlt || "",
  mediaTitle: data?.mediaTitle || "",
  mediaCaption: data?.mediaCaption || "",
  mediaTranscript: data?.mediaTranscript || "",
});

export const defaultBrandValues = (data) => ({
  _id: data?._id || null,
  name: data?.name || "",
  englishName: data?.englishName || "",
  slug: data?.slug || "",
  description: data?.description || "",
  tags: data?.tags || [],
  logo: data?.logo || null,
  seo: { ...seoDefaultValues(data) },
});

export const defaultCategoryValues = (data) => ({
  _id: data?._id || null,
  name: data?.name || "",
  slug: data?.slug || "",
  description: data?.description || "",
  children: data?.children || [],
  tags: data?.tags || [],
  image: data?.image || null,
  seo: { ...seoDefaultValues(data) },
});

export const defaultProductValues = (data) => ({
  _id: data?._id || null,
  title: data?.title || "",
  slug: data?.slug || "",
  excerpt: data?.excerpt || "",
  description: data?.description || "",
  price: data?.price || null,
  discount: data?.discount || null,
  stock: data?.stock || null,
  categories: data?.categories || [],
  relatedProducts: data?.relatedProducts || [],
  brand: data?.brand || {},
  tags: data?.tags || [],
  media: data?.media || [],
  shortSpecifications: data?.shortSpecifications || [],
  specifications: data?.specifications || [],
  seo: { ...seoDefaultValues(data) },
});

export const defaultCustomerValues = (data) => ({
  _id: data?._id || null,
  firstName: data?.firstName || "",
  lastName: data?.lastName || "",
  phone: data?.phone || "",
  email: data?.email || "",
  birthdate: data?.birthdate || "",
});

export const defaultGeneralSettingsValues = (data) => ({
  _id: data?._id || null,
  logo: data?.logo || "",
  name: data?.name || "",
  footerText: data?.footerText || "",
  contactInfo: data?.contactInfo || {
    mobile: "",
    phone: "",
    email: "",
    address: "",
    mapIframe: "",
  },
  social: data?.social || {
    instagram: "",
    telegram: "",
    whatsapp: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    x: "",
  },
  homepageSlider: data?.homepageSlider || [],
});

export const seoSettingsDefaultValues = (data) => ({
  title: data?.title || "",
  description: data?.description || "",
  keywords: data?.keywords || "",
  ogTitle: data?.ogTitle || "",
  ogDescription: data?.ogDescription || "",
  ogImage: data?.ogImage || "",
  twitterTitle: data?.twitterTitle || "",
  twitterDescription: data?.twitterDescription || "",
  twitterImage: data?.twitterImage || "",
  canonical: data?.canonical || "",
  robots: data?.robots || "",
  additionalMetaTags: data?.additionalMetaTags || "",
});

export const aboutSettingsDefaultValues = (data) => ({
  description: data?.description || "",
  image: data?.image || "",
});

export const faqSettingsDefaultValues = (data) =>
  data || [{ question: "", answer: "" }];

export const termsSettingsDefaultValues = (data) =>
  data || [{ title: "", description: "" }];


export const defaultOrderValues = (data) => ({
  status: data?.status || "",
  shipmentTrackNumber: data?.shipmentTrackNumber || [],
});
