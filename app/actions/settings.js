"use server";

import connectDB from "@/server/db";
import settingsService  from "@/server/modules/settings/settings.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import { updateSettingsSchema } from "@/validation/settings.validation";
import { serialize } from "@/lib/request";

/* -------------------- */
/* GET ALL SETTINGS      */
/* -------------------- */
export async function getAllSettings() {
  try {
    await connectDB();

    const settings = await settingsService.getSettings();

    return { data: serialize(settings) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET DEFAULT SEO       */
/* -------------------- */
export async function getDefaultSeo() {
  try {
    await connectDB();

    const defaultSeo = await settingsService.getDefaultSeo();

    return { data: serialize(defaultSeo) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET TERMS SCHEMA      */
/* -------------------- */
export async function getTermsSchema() {
  try {
    await connectDB();

    const schema = await settingsService.getTermsSchema();

    return { data: serialize(schema) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET FAQ SCHEMA        */
/* -------------------- */
export async function getFaqSchema() {
  try {
    await connectDB();

    const schema = await settingsService.getFaqSchema();

    return { data: serialize(schema) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET SETTINGS SECTION  */
/* -------------------- */
export async function getSettingsSection(section) {
  try {
    await connectDB();

    const settings = await settingsService.getSection(section);

    return { data: serialize(settings) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* UPDATE SETTINGS SECTION */
/* -------------------- */
export async function updateSettingsSection(section, data) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireAdmin(auth);

    const validatedData = await validate(updateSettingsSchema, data);

    await settingsService.update(validatedData, section);

    return { 
      message: "تنظیمات سایت با موفقیت ویرایش شد.",
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}