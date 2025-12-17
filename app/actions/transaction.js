"use server";

import connectDB from "@/server/db";
import  transactionService  from "@/server/modules/transaction/transaction.service";
import orderService  from "@/server/modules/order/order.service";
import { authenticate } from "@/server/middlewares/auth";
import { calculateFinalPrice } from "@/server/lib/number";

const FRONTEND_BASE = process.env.NEXT_PUBLIC_BASE_URL;
const APP_BASE = process.env.NEXT_PUBLIC_BASE_URL;

/* -------------------- */
/* INITIATE PAYMENT      */
/* -------------------- */
export async function initiateTransaction({ orderId, mobile = "", email = "" }) {
  try {
    await connectDB();

    const auth = await authenticate();
    if (!auth) throw new Error("Unauthorized");

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
      return { redirectUrl };
    } else {
      txn.status = "FAILED";
      txn.error = {
        code: data.code || -1,
        message: data.message || "Request failed",
      };
      await txn.save();

      throw new Error(data.message || "Could not create payment");
    }
  } catch (err) {
    console.error("initiateTransaction error", err);
    throw new Error(err.message || "Internal server error");
  }
}

/* -------------------- */
/* VERIFY PAYMENT        */
/* -------------------- */
export async function verifyTransaction({ tx, authorityParam }) {
  try {
    await connectDB();

    let txn = await transactionService.getDetails(tx);
    if (!txn) throw new Error("Transaction not found");

    const order = txn.orderId;

    if (txn.status === "SUCCESS") {
      return { redirectUrl: `${FRONTEND_BASE}/payment-result?order=${order.code}&result=successful` };
    }

    if (!authorityParam || txn.authority !== authorityParam) {
      txn.status = "FAILED";
      txn.error = { message: "Authority mismatch" };
      await transactionService.update(txn._id, { status: txn.status, error: txn.error });
      await orderService.update({ status: "failed" }, order._id);

      return { redirectUrl: `${FRONTEND_BASE}/payment-result?order=${order.code}&result=failed` };
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

      return { redirectUrl: `${FRONTEND_BASE}/payment-result?order=${order.code}&result=successful` };
    }

    // Payment failed
    txn.status = "FAILED";
    txn.error = { code: vdata.code, message: vdata.message };
    await transactionService.update(txn._id, { status: txn.status, error: txn.error });
    await orderService.update({ status: "failed" }, order._id);

    return { redirectUrl: `${FRONTEND_BASE}/payment-result?order=${order.code}&result=failed` };
  } catch (err) {
    console.error("verifyTransaction error", err);

    const orderCode = err.order?.code || "unknown";
    return { redirectUrl: `${FRONTEND_BASE}/payment-result?order=${orderCode}&result=failed` };
  }
}
