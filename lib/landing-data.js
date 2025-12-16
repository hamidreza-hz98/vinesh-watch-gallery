import "server-only";
import {
  cartApi,
  getAllBrandsApi,
  getAllCategoriesApi,
  getCartApi,
  getCustomerCartApi,
  modifySettingsApi,
  settingsApi,
} from "@/constants/api.routes";
import { cookies } from "next/headers";
import { setRequestQuery } from "./request";

export async function getLandingData() {
  const cookieStore = await cookies(); // ✅ FIX
  const cartId = cookieStore.get("cart")?.value;
  const customerId = cookieStore.get("customer")?.value;

  let cartRequest;

  if (cartId) {
    cartRequest = fetch(getCartApi(cartId), { cache: "no-store" });
  } else if (customerId) {
    cartRequest = fetch(getCustomerCartApi(customerId), { cache: "no-store" });
  } else {
    cartRequest = fetch(cartApi, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ products: [], price: {} }),
    });
  }

  const query = setRequestQuery({
    filters: {
      children: { type: "hasChildren" },
    },
  });

  console.log(query);
  

  const [categoriesRes, brandsRes, settingsRes, cartRes] = await Promise.all([
    fetch(getAllCategoriesApi(query), { next: { revalidate: 600 } }),
    fetch(getAllBrandsApi(""), { next: { revalidate: 600 } }),
    fetch(settingsApi, { next: { revalidate: 600 } }),
    cartRequest,
  ]);

const [categoriesJson, brandsJson, settingsJson, cartJson] = await Promise.all([
  categoriesRes.json(),
  brandsRes.json(),
  settingsRes.json(),
  cartRes.json(),
]);

const categories = categoriesJson.categories;
const brands = brandsJson.brands;
const settings = settingsJson.settings;
const cart = cartJson.cart ?? cartJson;

  return {
    categories,
    brands,
    settings,
    cart,
  };
}
