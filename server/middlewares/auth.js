const { cookies } = require("next/headers");
const { verifyToken } = require("@/server/lib/token");
const Admin = require("@/server/modules/admin/admin.model");
const Customer = require("@/server/modules/customer/customer.model");

/**
 * Extract token from cookies
 */
async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    const err = new Error("توکن نامعتبر");
    err.statusCode = 401;
    throw err;
  }
  return token;
}

async function getAdminToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) {
    const err = new Error("توکن مدیر نامعتبر");
    err.statusCode = 401;
    throw err;
  }
  return token;
}

/**
 * Authenticate request and return auth context
 * @returns { type, user, token }
 */
async function authenticate({ adminOnly = false } = {}) {
  let token, decoded, user;

  if (adminOnly) {
    // Admin-specific authentication
    token = await getAdminToken();
    decoded = verifyToken(token);
    if (!decoded || decoded.type !== "admin") {
      const err = new Error("توکن مدیر نامعتبر");
      err.statusCode = 401;
      throw err;
    }

    user = await Admin.findById(decoded.id).lean();
    if (!user) {
      const err = new Error("مدیر پیدا نشد");
      err.statusCode = 401;
      throw err;
    }

    return { type: "admin", user, token };
  }

  // Generic authentication (customer or admin)
  token = await getToken();
  decoded = verifyToken(token);
  if (!decoded) {
    const err = new Error("توکن نامعتبر");
    err.statusCode = 401;
    throw err;
  }

  if (decoded.type === "admin") {
    const adminToken = await getAdminToken();
    if (!adminToken) {
      const err = new Error("توکن مدیر برای دسترسی admin لازم است");
      err.statusCode = 401;
      throw err;
    }

    user = await Admin.findById(decoded.id).lean();
    if (!user) {
      const err = new Error("مدیر پیدا نشد");
      err.statusCode = 401;
      throw err;
    }
  } else if (decoded.type === "customer") {
    user = await Customer.findById(decoded.id).lean();
    if (!user) {
      const err = new Error("مشتری پیدا نشد");
      err.statusCode = 401;
      throw err;
    }
  } else {
    const err = new Error("نوع توکن ناشناخته");
    err.statusCode = 401;
    throw err;
  }

  return { type: decoded.type, user, token };
}

/**
 * Role guards
 */
function requireAdmin(auth) {
  if (auth.type !== "admin") {
    const err = new Error("دسترسی مدیر مورد نیاز است");
    err.statusCode = 403;
    throw err;
  }
}

function requireCustomer(auth) {
  if (auth.type !== "customer") {
    const err = new Error("دسترسی مشتری مورد نیاز است");
    err.statusCode = 403;
    throw err;
  }
}

function allowCustomerOrAdmin(auth) {
  if (auth.type === "admin" || auth.type === "customer") return;

  const err = new Error("دسترسی مشتری یا مدیر مورد نیاز است");
  err.statusCode = 403;
  throw err;
}

module.exports = {
  authenticate,
  requireAdmin,
  requireCustomer,
  allowCustomerOrAdmin,
};
