const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const orderService = require("@/server/modules/order/order.service");
const { authenticate, requireCustomer } = require("@/server/middlewares/auth");

exports.runtime = "nodejs";

// GET CUSTOMER ORDER DETAILS
exports.GET = async function (req, { params }) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireCustomer(auth);

    const customerId = req.nextUrl.searchParams.get("customerId");
    const order = await orderService.getCustomerOrderDetails(params._id, customerId);

    return NextResponse.json({ data: order });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};
