"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { productColumns } from "@/constants/columns";
import { transformGridQuery } from "@/lib/request";
import { deleteProduct, getAllProducts } from "@/app/actions/product";

const ProductsPageWrapper = () => {
  // Fetch products from API
  const getProducts = async (params) => {
    try {
      const query = transformGridQuery({ ...params });

      const { data } = await getAllProducts(query);

      return {
        items: data.products,
        rowCount: data.total,
      };
    } catch (err) {
      console.error("Failed to fetch products:", err);
      return {
        items: [],
        rowCount: 0,
      };
    }
  };

  // Delete a product
  const handleDeleteProduct = async (_id) => {
    try {
      const data = await deleteProduct(_id);

      return { success: true, message: data.message };
    } catch (err) {
      console.error("Failed to delete product:", err);
      return { success: false, message: err.message || "خطا در حذف محصول" };
    }
  };

  return (
    <div>
      <Overview
        title="مدیریت محصولات"
        breadcrumbs={[
          { name: "گالری ساعت وینش" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "محصولات" },
        ]}
        columns={productColumns}
        getMany={getProducts}
        deleteOne={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductsPageWrapper;
