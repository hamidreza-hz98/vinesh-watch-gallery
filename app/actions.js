"use server";

import { cookies } from "next/headers";

export async function createCartCookie(cart) {
  const cookieStore = await cookies();

  cookieStore.set("cart", cart._id, {
    maxAge: 365 * 30 * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
  });
}
