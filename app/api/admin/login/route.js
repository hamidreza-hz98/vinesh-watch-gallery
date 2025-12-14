const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const adminService = require("@/server/modules/admin/admin.service");
const validate = require("@/server/middlewares/validate");
const { loginAdminSchema } = require("@/validation/admin.validation");

exports.runtime = "nodejs";

// LOGIN
exports.POST = async function (req) {
  try {
    await connectDB();

    const body = await req.json();
    const data = await validate(loginAdminSchema, body);

    const { admin, token } = await adminService.login(data);

    return NextResponse.json({
      message: `${admin.username} عزیز، خوش آمدید.`,
      data: { admin, token },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
