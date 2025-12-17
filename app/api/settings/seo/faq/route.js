const connectDB = require("@/server/db");
const settingsService = require("@/server/modules/settings/settings.service");
const { NextResponse } = require("next/server");

exports.runtime = "nodejs";

// GET FAQ SCHEMA
exports.GET = async () => {
  try {
    await connectDB();
    
    const schema = await settingsService.getFaqSchema();

    return NextResponse.json({ data: schema });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};