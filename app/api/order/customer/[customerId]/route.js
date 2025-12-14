const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const orderService = require("@/server/modules/order/order.service");
const { authenticate, requireCustomer } = require("@/server/middlewares/auth");

exports.runtime = "nodejs";

// GET CUSTOMER ORDERS
exports.GET = async function (req, { params }) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireCustomer(auth);

    const { search, sort, page, page_size, filters } = Object.fromEntries(req.nextUrl.searchParams);

    const result = await orderService.getCustomerOrders(params._id, {
      search,
      sort: sort ? JSON.parse(sort) : undefined,
      page: page ? parseInt(page) : undefined,
      page_size: page_size ? parseInt(page_size) : undefined,
      filters: filters ? JSON.parse(filters) : undefined,
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};
