const connectDB = require("@/server/db");
const productService = require("@/server/modules/product/product.service");
const { NextResponse } = require("next/server");

exports.runtime = "nodejs";

exports.GET = async (req) => {
  try {
     await connectDB();

         const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
    const filter = Object.fromEntries(url.searchParams.entries());

     const { seo, schema } = await productService.getSeoData(filter)

          return NextResponse.json({ seo, schema });
      
  } catch (error) {
        return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
}