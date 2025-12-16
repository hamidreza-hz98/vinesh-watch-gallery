export const sortProductOptions = [
  { label: "گران ترین", field: "price", order: "desc" },
  { label: "ارزان ترین", field: "price", order: "asc" },
  { label: "جدیدترین", field: "createdAt", order: "desc" },
  { label: "قدیمی ترین", field: "createdAt", order: "asc" },
  { label: "پر بازدید ترین", field: "visits", order: "asc" },
  { label: "پر فروش ترین", field: "soldNumber", order: "asc" },
];

export const filterProductsOptions = [
  { label: "فیلتر بر اساس دسته بندی", field: "category" },
  { label: "فیلتر بر اساس برند", field: "brand" },
  { label: "فیلتر بر اساس قیمت", field: "price" },
  { label: "فیلتر بر اساس کالاهای موجود", field: "inStock" },
  { label: "فیلتر بر اساس کالاهای دارای تخفیف", field: "hasDiscount" },
];
