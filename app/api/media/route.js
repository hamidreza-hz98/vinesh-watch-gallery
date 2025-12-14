const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const { mediaService } = require("@/server/modules/media/media.service");

exports.runtime = "nodejs";

exports.GET = async function (req) {
  try {
    await connectDB();
    const auth = await authenticate(req);
    requireAdmin(auth);

    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const { items, total } = await mediaService.getAll(query);

    return NextResponse.json({
      data: { items, total, ...query },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
