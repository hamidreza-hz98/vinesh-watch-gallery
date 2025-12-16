import { NextResponse } from "next/server";
import connectDB from "@/server/db";
import brandService from "@/server/modules/brand/brand.service";

export const runtime = "nodejs";

export const GET = async (req) => {
  try {
    await connectDB();

    const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
    const filter = Object.fromEntries(url.searchParams.entries());

    const brand = await brandService.getDetails(filter);

    return NextResponse.json({ data: brand });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
