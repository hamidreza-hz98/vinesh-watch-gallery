"use server";

import connectDB from "@/server/db";
import dashboardService from "@/server/modules/dashboard/dashboard.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import { serialize } from "@/lib/request";

/* -------------------- */
/* GET DASHBOARD DATA    */
/* -------------------- */
export async function getDashboardData(status) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireAdmin(auth);

    const dashboard = await dashboardService.getDashboardData(status);

    return { data: serialize(dashboard) };
  } catch (error) {
    return { message: error.message || "مشکلی پیش آمد", status: error.statusCode || 500 };
  }
}
