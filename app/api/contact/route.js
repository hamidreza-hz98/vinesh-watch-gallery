const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const contactService = require("@/server/modules/contact/contact.service");
const validate = require("@/server/middlewares/validate");
const { submit: contactSubmitSchema } = require("@/validation/contact.validation");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");

exports.runtime = "nodejs";

exports.POST = async function (req) {
  try {
    await connectDB();

    const body = await req.json();
    const data = await validate(contactSubmitSchema, body);

    const contact = await contactService.submit(data);

    return NextResponse.json({
      message: `${contact.fullName} عزیز. به زودی با شما تماس میگیریم!`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "مشکلی پیش آمد." },
      { status: error.statusCode || 500 }
    );
  }
};

exports.GET = async function (req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams.entries());

    const { contacts, total } = await contactService.getAll(query);

    return NextResponse.json({
      data: contacts,
      total,
      ...query,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "مشکلی پیش آمد." },
      { status: error.statusCode || 500 }
    );
  }
};
