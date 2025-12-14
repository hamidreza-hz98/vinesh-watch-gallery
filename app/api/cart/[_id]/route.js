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

    const auth = await authenticate(req);
    requireCustomer(auth);

    const body = await req.json();
    const data = await validate(updateCartSchema, body);

    const cart = await cartService.update(params._id, data);

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

    const cart = await cartService.getCart(params._id);

    return NextResponse.json({ data: cart });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
