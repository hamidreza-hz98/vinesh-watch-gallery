import { verifyTransaction } from "@/app/actions/transaction";

exports.runtime = "nodejs";

export const GET = async (req) => {
  const url = new URL(req.url);
  const tx = url.searchParams.get("tx");
  const authorityParam = url.searchParams.get("Authority") || url.searchParams.get("authority");

  const { redirectUrl } = await verifyTransaction({ tx, authorityParam });
  
  // redirect to frontend result page
  return Response.redirect(redirectUrl);
};
