const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const orderService = require("@/server/modules/order/order.service");
const {
  authenticate,
  requireAdmin,
  requireCustomer,
} = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { createOrderSchema } = require("@/validation/order.validation");

exports.runtime = "nodejs";

// CREATE
exports.POST = async function (req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireCustomer(auth);

    const body = await req.json();
    const data = await validate(createOrderSchema, body);

    const order = await orderService.create(auth.user.id, data);

    return NextResponse.json({
      message: "سفارش با موفقیت ایجاد شد.",
      data: order,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

// GET ALL
exports.GET = async function (req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const auth = await authenticate(req);
    requireAdmin(auth);

    const {orders, total} = await orderService.getAll(query);

    return NextResponse.json({
      orders,
      total,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
