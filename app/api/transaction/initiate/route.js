// /app/api/transaction/initiate/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const transactionService = require("@/server/modules/transaction/transaction.service");
const orderService = require("@/server/modules/order/order.service");
const { authenticate } = require("@/server/middlewares/auth");
const { calculateFinalPrice } = require("@/server/lib/number");

const APP_BASE = process.env.NEXT_PUBLIC_BASE_URL;

exports.runtime = "nodejs";

exports.POST = async (req) => {
  try {
    await connectDB();
    
    
    const auth = await authenticate(req);
    
    const { orderId, mobile = "", email = "" } = await req.json();
    
    const order = await orderService.getDetails(orderId);
    const amount = calculateFinalPrice(order.price);
    

    const txn = await transactionService.create({
      orderId: order._id,
      amount,
      description: `پرداخت برای سفارش ${order._id}`,
      metadata: {
        mobile: order.customer.phone,
        email: order.customer.email || "",
      },
      status: "PENDING",
    });

    const callbackUrl = `${APP_BASE}/api/transaction/verify?tx=${txn._id}`;

    const result = await transactionService.requestPayment({
      amount,
      description: txn.description,
      callback_url: callbackUrl,
      metadata: { mobile, email },
    });

    const data = result.data || {};
    if (data.code === 100 && data.authority) {
      txn.authority = data.authority;
      txn.status = "PENDING_REDIRECT";
      await txn.save();

      await orderService.addTransactionToOrder(order._id, txn._id);

      const redirectUrl = transactionService.buildStartPayUrl(data.authority);
      return NextResponse.json({ redirectUrl });
    } else {
      txn.status = "FAILED";
      txn.error = {
        code: data.code || -1,
        message: data.message || "Request failed",
      };
      await txn.save();

      return NextResponse.json(
        { error: data.message || "Could not create payment" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("initiate err", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
};
