const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const tagService = require("@/server/modules/tag/tag.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { createTagSchema } = require("@/validation/tag.validation");

export const runtime = "nodejs";

export const POST = async (req) => {
  try {
    await connectDB();
    
    const auth = await authenticate(req);
    requireAdmin(auth);
    

    const body = await req.json();
    const data = await validate(createTagSchema, body);
    
    const tag = await tagService.create(data);

    return NextResponse.json(
      {
        message: `برچسب ${tag.name} با موفقیت ایجاد شد.`,
        data: tag,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const { tags, total } = await tagService.getAll(query);

    return NextResponse.json({
      message: "برچسب ها با موفقیت دریافت شدند.",
      data: {
        tags, total, ...query
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
