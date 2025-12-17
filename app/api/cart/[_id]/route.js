const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const cartService = require("@/server/modules/cart/cart.service");
const { authenticate, requireCustomer } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { updateCartSchema } = require("@/validation/cart.validation");

exports.runtime = "nodejs";

exports.PUT = async function (req, { params }) {
  try {
    await connectDB();
    const { _id } = await params
    
    const body = await req.json();

    const cart = await cartService.update(_id, body);

    return NextResponse.json({ data: cart });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

exports.GET = async function (req, { params }) {
  try {
    await connectDB();
    const { _id } = await params

    const cart = await cartService.getCart(_id);

    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
