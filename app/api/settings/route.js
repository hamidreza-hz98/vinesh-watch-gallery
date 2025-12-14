// /app/api/settings/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const settingsService = require("@/server/modules/settings/settings.service");

exports.runtime = "nodejs";

// GET ALL SETTINGS
exports.GET = async () => {
  try {
    await connectDB();
    const settings = await settingsService.getSettings();
    return NextResponse.json({ data: settings });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};

// GET DEFAULT SEO
exports.GET_SEO = async () => {
  try {
    await connectDB();
    const defaultSeo = await settingsService.getDefaultSeo();
    return NextResponse.json({ data: defaultSeo });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};

// GET FAQ SCHEMA
exports.GET_SEO_FAQ = async () => {
  try {
    await connectDB();
    const schema = await settingsService.getFaqSchema();
    return NextResponse.json({ data: schema });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};

// GET TERMS SCHEMA
exports.GET_SEO_TERMS = async () => {
  try {
    await connectDB();
    const schema = await settingsService.getTermsSchema();
    return NextResponse.json({ data: schema });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};
