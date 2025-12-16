const connectDB = require("@/server/db");
const settingsService = require("@/server/modules/settings/settings.service");
const { NextResponse } = require("next/server");

exports.runtime = "nodejs";

// GET DEFAULT SEO
exports.GET = async () => {
  try {
    await connectDB();

    const defaultSeo = await settingsService.getDefaultSeo();

    return NextResponse.json({ data: defaultSeo });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};