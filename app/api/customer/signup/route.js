const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const customerService = require("@/server/modules/customer/customer.service");
const validate = require("@/server/middlewares/validate");
const { create: createCustomerSchema } = require("@/validation/customer.validation");

exports.runtime = "nodejs";

exports.POST = async function (req) {
  try {
    await connectDB();

    const body = await req.json();
    const data = await validate(createCustomerSchema, body);

    const { customer, token } = await customerService.signup(data);

    return NextResponse.json({
      message: `به خانواده ما خوش اومدی!`,
      data: { customer, token },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
