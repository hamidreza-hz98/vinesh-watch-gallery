const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const dashboardService = require("@/server/modules/dashboard/dashboard.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");

exports.runtime = "nodejs";

exports.GET = async function (req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const dashboard = await dashboardService.getDashboardData(status);

    return NextResponse.json(dashboard);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "مشکلی پیش آمد",
      },
      {
        status: error.statusCode || 500,
      }
    );
  }
};
