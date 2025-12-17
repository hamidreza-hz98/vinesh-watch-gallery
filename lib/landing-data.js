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

export async function getLandingData() {
  const cookieStore = await cookies(); // ✅ FIX
  const cartId = cookieStore.get("cart")?.value;
  const customerId = cookieStore.get("customer")?.value;

  let cartRequest;

  if (cartId) {
    cartRequest = fetchWithAuth(getCartApi(cartId), { cache: "no-store" });
  } else if (customerId) {
    cartRequest = fetchWithAuth(getCustomerCartApi(customerId), { cache: "no-store" });
  } else {
    cartRequest = fetchWithAuth(cartApi, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  const query = setRequestQuery({
    filters: {
      children: { type: "hasChildren" },
    },
  });

  const [{categories}, {brands}, {settings}, {cart}] = await Promise.all([
    fetchWithAuth(getAllCategoriesApi(query), { next: { revalidate: 600 } }),
    fetchWithAuth(getAllBrandsApi(""), { next: { revalidate: 600 } }),
    fetchWithAuth(settingsApi, { next: { revalidate: 600 } }),
    cartRequest,
  ]);

  return {
    categories,
    brands,
    settings,
    cart,
  };
}
