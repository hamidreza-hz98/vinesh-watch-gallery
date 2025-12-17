const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const addressService = require("@/server/modules/address/address.service");
const { authenticate, requireCustomer } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { updateAddressSchema } = require("@/validation/address.validation");

exports.runtime = "nodejs";

// UPDATE ADDRESS
exports.PUT = async function (req, { params }) {
  try {
    await connectDB();
    const { _id } = await params
    
    const auth = await authenticate(req);
    requireCustomer(auth);

    const body = await req.json();
    const data = await validate(updateAddressSchema, body);

    const address = await addressService.update(data, _id);
    
    return NextResponse.json({
      message: "آدرس با موفقیت ویرایش شد.",
      data: address,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

// DELETE ADDRESS
exports.DELETE = async function (req, { params }) {
  try {
    await connectDB();
    const { _id } = await params

    const auth = await authenticate(req);
    requireCustomer(auth);

    const address = await addressService.delete(_id);

    return NextResponse.json({
      message: "آدرس با موفقیت حذف شد.",
      data: address,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
