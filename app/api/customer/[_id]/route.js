const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const customerService = require("@/server/modules/customer/customer.service");
const validate = require("@/server/middlewares/validate");
const { authenticate, allowCustomerOrAdmin, requireAdmin } = require("@/server/middlewares/auth");
const { updateCustomerSchema } = require("@/validation/customer.validation");

exports.runtime = "nodejs";

// GET CUSTOMER DETAILS
exports.GET = async function (req, { params }) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    allowCustomerOrAdmin(auth, params._id);

    const customer = await customerService.getDetails(params._id);

    return NextResponse.json({ data: customer });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

// UPDATE CUSTOMER
exports.PUT = async function (req, { params }) {
  try {
    await connectDB();
    const { _id } = await params
    
    const auth = await authenticate(req);
    allowCustomerOrAdmin(auth, _id);

    const body = await req.json();
    const data = await validate(updateCustomerSchema, body);

    const customer = await customerService.update(data, _id);

    return NextResponse.json({
      message: `کاربر ${customer.firstName} ${customer.lastName} با موفقیت ویرایش شد.`,
      data: customer,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

// DELETE CUSTOMER
exports.DELETE = async function (req, { params }) {
  try {
    await connectDB();
    const { _id } = await params

    const auth = await authenticate(req);
    requireAdmin(auth);

    const customer = await customerService.delete(_id);

    return NextResponse.json({
      message: `کاربر ${customer.firstName} ${customer.lastName} با موفقیت حذف شد.`,
      data: customer,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
