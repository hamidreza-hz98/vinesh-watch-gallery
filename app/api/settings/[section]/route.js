// /app/api/settings/[section]/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const settingsService = require("@/server/modules/settings/settings.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { settingsValidation } = require("@/server/modules/settings/settings.validation");

exports.runtime = "nodejs";

// UPDATE SETTINGS SECTION
exports.PUT = async (req, { params }) => {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(settingsValidation.update, body);

    const settings = await settingsService.update(data, params.section);

    return NextResponse.json({
      message: "تنظیمات سایت با موفقیت ویرایش شد.",
      data: settings,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};

// GET SETTINGS SECTION
exports.GET = async (req, { params }) => {
  try {
    await connectDB();

    const settings = await settingsService.getSection(params.section);

    return NextResponse.json({ data: settings });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};
