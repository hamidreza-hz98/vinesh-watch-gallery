// /app/api/transaction/retry/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const transactionService = require("@/server/modules/transaction/transaction.service");
const orderService = require("@/server/modules/order/order.service");
const { authenticate } = require("@/server/middlewares/auth");
const initiate = require("../initiate/route").POST;

exports.runtime = "nodejs";

exports.POST = async (req) => {
  try {
    await connectDB();
    const auth = await authenticate(req);

    const { orderId } = await req.json();
    const order = await orderService.getDetails(orderId);

    if (!["pending_payment", "failed"].includes(order.status)) {
      return NextResponse.json(
        { error: "امکان پرداخت مجدد برای این سفارش وجود ندارد" },
        { status: 400 }
      );
    }

    // Reuse initiate logic
    return await initiate(req);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در ایجاد پرداخت مجدد" }, { status: 500 });
  }
};
