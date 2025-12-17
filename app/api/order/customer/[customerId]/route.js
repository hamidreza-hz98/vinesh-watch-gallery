const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const orderService = require("@/server/modules/order/order.service");
const { authenticate, requireCustomer } = require("@/server/middlewares/auth");
const QueryString = require("qs");

exports.runtime = "nodejs";

// GET CUSTOMER ORDERS
exports.GET = async function (req, { params }) {
  try {
    await connectDB();
    const { customerId } = await params;

    const auth = await authenticate(req);
    requireCustomer(auth);

    const url = new URL(req.url);
    const objectedQuery = Object.fromEntries(url.searchParams.entries());
    const query = QueryString.parse(objectedQuery);

    const { orders, total } = await orderService.getCustomerOrders(customerId, query);

    return NextResponse.json({ data: { orders, total, ...query } });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
