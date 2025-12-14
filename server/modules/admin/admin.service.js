const Admin = require("./admin.model");
const throwError = require("../../middlewares/throw-error");
const bcrypt = require("bcrypt");
const { generateToken } = require("@/server/lib/token");

const adminService = {
  /* -------------------- */
  /* CREATE ADMIN USER    */
  /* -------------------- */
  async create(data) {
    // Check if username already exists
    const existing = await Admin.exists({ username: data.username });
    if (existing) {
      throwError("کاربر با این شناسه کاربری وجود دارد.", 409);
    }

    // Hash the password here instead of in pre-hook
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const admin = new Admin({
      ...data,
      password: hashedPassword,
    });

    return await admin.save();
  },

  /* -------------------- */
  /* LOGIN ADMIN USER     */
  /* -------------------- */
  async login(data) {
    const existing = await Admin.findOne({ username: data.username });
    if (!existing) {
      throwError("نام کاربری یا کلمه ی عبور اشتباه است.", 401);
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(data.password, existing.password);
    if (!isMatch) {
      throwError("نام کاربری یا کلمه ی عبور اشتباه است.", 401);
    }

    const token = generateToken({
      id: existing._id,
      type: "admin",
    });

    const { password: _, ...adminData } = existing.toObject();

    return { admin: adminData, token };
  },

  /* -------------------- */
  /* UPDATE PASSWORD      */
  /* -------------------- */
  async updatePassword(adminId, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    return await Admin.findByIdAndUpdate(
      adminId,
      { password: hashedPassword },
      { new: true }
    );
  },
};

module.exports = adminService;
