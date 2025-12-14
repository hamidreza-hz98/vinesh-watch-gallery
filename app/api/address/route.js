const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const addressService = require("@/server/modules/address/address.service");
const { authenticate, requireCustomer } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { createAddressSchema } = require("@/validation/address.validation");

exports.runtime = "nodejs";

// CREATE ADDRESS
exports.POST = async function (req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireCustomer(auth);

    const body = await req.json();
    const data = await validate(createAddressSchema, body);

    const address = await addressService.create(data);

    return NextResponse.json({
      message: "آدرس جدید با موفقیت ساخته شد.",
      data: address,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
