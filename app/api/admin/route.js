const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const adminService = require("@/server/modules/admin/admin.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { createAdminSchema } = require("@/validation/admin.validation");

exports.runtime = "nodejs";

// CREATE ADMIN
exports.POST = async function (req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(createAdminSchema, body);

    const admin = await adminService.create(data);

    return NextResponse.json({
      message: `ادمین ${admin.username} ساخته شد.`,
      data: admin,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
