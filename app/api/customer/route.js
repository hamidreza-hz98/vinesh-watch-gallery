const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const customerService = require("@/server/modules/customer/customer.service");
const validate = require("@/server/middlewares/validate");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const { createCustomerSchema } = require("@/validation/customer.validation");

exports.runtime = "nodejs";

// CREATE CUSTOMER
exports.POST = async function (req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(createCustomerSchema, body);

    const customer = await customerService.create(data);

    return NextResponse.json({
      message: `کاربر ${customer.firstName} ${customer.lastName} با موفقیت ساخته شد.`,
      data: customer,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

// GET ALL CUSTOMERS
exports.GET = async function (req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const { search, sort, page, page_size, filters } = Object.fromEntries(req.nextUrl.searchParams);

    const result = await customerService.getAll({
      search,
      sort: sort ? JSON.parse(sort) : undefined,
      page: page ? parseInt(page) : undefined,
      page_size: page_size ? parseInt(page_size) : undefined,
      filters: filters ? JSON.parse(filters) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
