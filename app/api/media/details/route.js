const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const { mediaService } = require("@/server/modules/media/media.service");

exports.runtime = "nodejs";

exports.GET = async function (req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const filter = Object.fromEntries(searchParams.entries());

    const media = await mediaService.getDetails(filter);

    return NextResponse.json({ data: media });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
