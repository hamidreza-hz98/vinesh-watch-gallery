// /app/api/settings/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const settingsService = require("@/server/modules/settings/settings.service");

// GET ALL SETTINGS
exports.GET = async () => {
  try {
    await connectDB();
    const settings = await settingsService.getSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};