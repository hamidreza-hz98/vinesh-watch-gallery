const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const cartService = require("@/server/modules/cart/cart.service");
const { authenticate, requireCustomer } = require("@/server/middlewares/auth");

exports.runtime = "nodejs";

exports.GET = async function (req, { params }) {
  try {
    await connectDB();
    const { customerId } = await params

    const auth = await authenticate(req);
    requireCustomer(auth);

    const cart = await cartService.getCustomerCart(customerId);

    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
