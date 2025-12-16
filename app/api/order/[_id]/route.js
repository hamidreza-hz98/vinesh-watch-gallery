const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const orderService = require("@/server/modules/order/order.service");
const validate = require("@/server/middlewares/validate");
const { updateOrderSchema } = require("@/validation/order.validation");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");

exports.runtime = "nodejs";

// GET ORDER DETAILS
exports.GET = async function (req, { params }) {
  try {
    await connectDB();
    const { _id } = await params
    
    const auth = await authenticate(req);
    requireAdmin(auth);

    const order = await orderService.getDetails(_id);

    return NextResponse.json({ data: order });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};

// UPDATE ORDER
exports.PUT = async function (req, { params }) {
  try {
    await connectDB();
    const { _id } = await params

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(updateOrderSchema, body);

    const order = await orderService.update(data, _id);

    return NextResponse.json({
      message: `سفارش ${order.code} با موفقیت ویرایش شد.`,
      data: order,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};
