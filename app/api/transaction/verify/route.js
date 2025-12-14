// /app/api/transaction/verify/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const transactionService = require("@/server/modules/transaction/transaction.service");
const orderService = require("@/server/modules/order/order.service");

const FRONTEND_BASE = process.env.FRONTEND_BASE_URL;

exports.runtime = "nodejs";

exports.GET = async (req) => {
  await connectDB();

  let txn = null;
  let order = null;

  try {
    const { searchParams } = new URL(req.url);
    const tx = searchParams.get("tx");
    const authorityParam = searchParams.get("Authority") || searchParams.get("authority");

    txn = await transactionService.getDetails(tx);
    order = txn.orderId;

    if (txn.status === "SUCCESS") {
      return NextResponse.redirect(`${FRONTEND_BASE}/payment-result?order=${order.code}&result=successful`);
    }

    if (!authorityParam || txn.authority !== authorityParam) {
      txn.status = "FAILED";
      txn.error = { message: "Authority mismatch" };

      await transactionService.update(txn._id, { status: txn.status, error: txn.error });
      await orderService.update({ status: "failed" }, order._id);

      return NextResponse.redirect(`${FRONTEND_BASE}/payment-result?order=${order.code}&result=failed`);
    }

    const verifyRes = await transactionService.verifyPayment({
      amount: 10000,
      authority: authorityParam,
    });

    const vdata = verifyRes.data || {};

    if (vdata.code === 100) {
      txn.status = "SUCCESS";
      txn.refId = vdata.ref_id;

      await transactionService.update(txn._id, { status: txn.status, refId: txn.refId });
      await orderService.update({ status: "processing" }, order._id);

      return NextResponse.redirect(`${FRONTEND_BASE}/payment-result?order=${order.code}&result=successful`);
    }

    // Payment failed
    txn.status = "FAILED";
    txn.error = { code: vdata.code, message: vdata.message };
    await transactionService.update(txn._id, { status: txn.status, error: txn.error });
    await orderService.update({ status: "failed" }, order._id);

    return NextResponse.redirect(`${FRONTEND_BASE}/payment-result?order=${order.code}&result=failed`);
  } catch (err) {
    console.error("verify error", err);

    const orderId = order?._id;
    const orderCode = order?.code || txn?.orderId?.code || "unknown";

    if (orderId) await orderService.update({ status: "failed" }, orderId);

    return NextResponse.redirect(`${FRONTEND_BASE}/payment-result?order=${orderCode}&result=failed`);
  }
};
