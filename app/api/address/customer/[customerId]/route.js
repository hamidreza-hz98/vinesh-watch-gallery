const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const addressService = require("@/server/modules/address/address.service");
const { authenticate, requireCustomer } = require("@/server/middlewares/auth");

exports.runtime = "nodejs";

exports.GET = async function (req, { params }) {
  try {
    await connectDB();
    const { customerId } = await params

    const auth = await authenticate(req);
    requireCustomer(auth);

    const addresses = await addressService.getCustomerAddresses(customerId);

    return NextResponse.json({ addresses });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
