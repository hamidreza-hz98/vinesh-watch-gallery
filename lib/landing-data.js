import "server-only";
import {
  cartApi,
  getAllBrandsApi,
  getAllCategoriesApi,
  getCartApi,
  getCustomerCartApi,
  settingsApi,
} from "@/constants/api.routes";
import { cookies } from "next/headers";
import { setRequestQuery } from "./request";
import { fetchWithAuth } from "./fetch";
import { createCart, getCartById, getCustomerCart } from "@/app/actions/cart";
import { getAllCategories } from "@/app/actions/category";
import { getAllBrands } from "@/app/actions/brand";
import { getAllSettings } from "@/app/actions/settings";

export async function getLandingData() {
  const cookieStore = await cookies(); // ✅ FIX
  const cartId = cookieStore.get("cart")?.value;
  const customerId = cookieStore.get("customer")?.value;

  let cartRequest;

  if (cartId) {
    cartRequest = getCartById(cartId);
  } else if (customerId) {
    cartRequest = getCustomerCart(customerId);
  } else {
    cartRequest = createCart();
  }

  const query = {
    filters: {
      children: { type: "hasChildren" },
    },
  };

  const [categoriesRes, brandsRes, settingsRes, cartRes] = await Promise.all([
    getAllCategories(query),
    getAllBrands(),
    getAllSettings(),
    cartRequest,
  ]);

  return {
    categories: categoriesRes.data.categories,
    brands: brandsRes.data.brands,
    settings: settingsRes.data,
    cart: cartRes.data,
  };
}
