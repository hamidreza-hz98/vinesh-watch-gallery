import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import brandService from "@/server/modules/brand/brand.service";
import { updateBrandSchema } from "@/validation/brand.validation";

const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");

exports.runtime = "nodejs";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { _id } = await params;

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(updateBrandSchema, body);

    const brand = await brandService.update(data, _id);

    return NextResponse.json({
      message: `برند ${brand.name} با موفقیت به‌روزرسانی شد.`,
      data: brand,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { _id } = await params;

    const auth = await authenticate(req);
    requireAdmin(auth);

    const brand = await brandService.delete(_id);

    return NextResponse.json({
      message: `برند ${brand.name} با موفقیت حذف شد.`,
      data: brand,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
