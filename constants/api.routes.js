export const adminLoginApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`;

export const uploadMediaApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/media/upload`;

export const getAllMediaApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/media`;

export const modifyMediaApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/media/${id}`;

export const brandApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/brand`;

export const brandDetailsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/details?${query}`;

export const modifyBrandApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/${id}`;

export const getAllBrandsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/brand?${query}`;

export const tagApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tag`;

export const modifyTagApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/tag/${id}`;

export const getAlltagsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/tag?${query}`;

export const categoryApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`;

export const categoryDetailsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/details?${query}`;

export const modifyCategoryApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${id}`;

export const getAllCategoriesApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/category?${query}`;

export const productApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`;

export const modifyProductApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`;

export const productDetailsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/details?${query}`;

export const getAllProductsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/product?${query}`;

export const customerApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer`;

export const modifyCustomerApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/${id}`;

export const getAllCustomersApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer?${query}`;

export const customerDetailsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/details?${query}`;

export const getSettingsApi = (section) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/${section}`;

export const modifySettingsApi = (section) => `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/${section}`;

export const orderApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`;

export const modifyOrderApi = (_id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${_id}`;

export const getAllOrdersApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/order?${query}`;

export const contactApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact?${query}`;

export const dashboardApi = "/api/dashboard";
