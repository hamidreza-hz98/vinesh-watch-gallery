const { verifyToken } = require("@/server/lib/token");
const Admin = require("@/server/modules/admin/admin.model");
const Customer = require("@/server/modules/customer/customer.model");

/**
 * Extract Bearer token
 */
function getToken(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("توکن نامعتبر");
    err.statusCode = 401;
    throw err;
  }
  return authHeader.split(" ")[1];
}

/**
 * Authenticate request and return auth context
 * @returns { type, user }
 */
async function authenticate(req) {
  const token = getToken(req);

  const decoded = verifyToken(token);
  if (!decoded) {
    const err = new Error("توکن نامعتبر");
    err.statusCode = 401;
    throw err;
  }

  let user = null;

  if (decoded.type === "admin") {
    user = await Admin.findById(decoded.id).lean();
    if (!user) {
      const err = new Error("مدیر پیدا نشد");
      err.statusCode = 401;
      throw err;
    }
  }

  if (decoded.type === "customer") {
    user = await Customer.findById(decoded.id).lean();
    if (!user) {
      const err = new Error("مشتری پیدا نشد");
      err.statusCode = 401;
      throw err;
    }
  }

  if (!user) {
    const err = new Error("نوع توکن ناشناخته");
    err.statusCode = 401;
    throw err;
  }

  return {
    type: decoded.type,
    user,
    token,
  };
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
