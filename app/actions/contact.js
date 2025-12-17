"use server";

import connectDB from "@/server/db";
import contactService from "@/server/modules/contact/contact.service";
import validate from "@/server/middlewares/validate";
import { submit as contactSubmitSchema } from "@/validation/contact.validation";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import { serialize } from "@/lib/request";

/* -------------------- */
/* SUBMIT CONTACT       */
/* -------------------- */
export async function submitContact(body) {
  try {
    await connectDB();

    const data = await validate(contactSubmitSchema, body);
    const contact = await contactService.submit(data);

    return {
      message: `${contact.fullName} عزیز. به زودی با شما تماس میگیریم!`,
    };
  } catch (error) {
    return {
      message: error.message || "مشکلی پیش آمد.",
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* GET ALL CONTACTS     */
/* -------------------- */
export async function getAllContacts(query = {}) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireAdmin(auth);

    const { contacts, total } = await contactService.getAll(query);

    return {
      data: serialize({
        contacts,
        total,
        ...query,
      }),
    };
  } catch (error) {
    return {
      message: error.message || "مشکلی پیش آمد.",
      status: error.statusCode || 500,
    };
  }
}
