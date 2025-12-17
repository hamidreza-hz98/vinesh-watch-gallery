const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const cartService = require("@/server/modules/cart/cart.service");
const validate = require("@/server/middlewares/validate");
const { createCartSchema } = require("@/validation/cart.validation");

exports.runtime = "nodejs";

exports.POST = async function (req) {
  try {
    await connectDB();

    const body = { products: [], price: {} }
    const data = await validate(createCartSchema, body);
    
    const cart = await cartService.create(data);
    
    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
