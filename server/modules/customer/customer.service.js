const Customer = require("./customer.model");
const throwError = require("../../middlewares/throw-error");
const { buildMongoFindQuery, buildMongoSort } = require("@/server/lib/filter");
const { generateToken } = require("@/server/lib/token");
const bcrypt = require("bcrypt");

const customerService = {
  /* -------------------- */
  /* CREATE CUSTOMER      */
  /* -------------------- */
  async create(data) {
    const existing = await Customer.exists({ phone: data.phone });
    if (existing) {
      throwError("مشتری با این شماره تلفن قبلا ثبت نام کرده است.", 409);
    }

    const customer = new Customer(data);

    return await customer.save();
  },

  /* -------------------- */
  /* UPDATE CUSTOMER      */
  /* -------------------- */
  async update(data, _id) {
    const existing = await Customer.exists({ _id });
    if (!existing) {
      throwError("مشتری با این مشخصات یافت نشد.", 404);
    }

    const {
      oldPassword,
      newPassword,
      newPasswordConfirmation,
      ...profileData
    } = data;

    const updated = await Customer.findByIdAndUpdate(_id, profileData, {
      new: true,
    });

    return updated;
  },

  async changePassword(customerId, oldPassword, newPassword) {
    const customer = await Customer.findById(customerId).select("+password");

    if (!customer) {
      throwError("مشتری با این مشخصات یافت نشد.", 404);
    }

    const isMatch = await bcrypt.compare(oldPassword, customer.password);
    if (!isMatch) {
      throwError("رمز عبور فعلی اشتباه است.", 400);
    }

    if (oldPassword === newPassword) {
      throwError("رمز عبور جدید نمی‌تواند مشابه رمز قبلی باشد.", 400);
    }

    customer.password = newPassword;
    await customer.save(); // bcrypt handled by pre-save hook

    return true;
  },

  /* -------------------- */
  /* GET ALL CUSTOMERS    */
  /* -------------------- */
  async getAll({
    search = "",
    sort = [{ field: "createdAt", order: "desc" }],
    page = 1,
    page_size = 10,
    filters = {},
  }) {
    const query = buildMongoFindQuery(filters, search, [
      "firstName",
      "lastName",
      "phone",
      "email",
    ]);
    const sortOption = buildMongoSort(sort);
    const skip = (page - 1) * page_size;

    const [customers, total] = await Promise.all([
      Customer.find(query).sort(sortOption).skip(skip).limit(page_size).lean(),
      Customer.find(query).countDocuments(),
    ]);

    return { customers, total };
  },

  /* -------------------- */
  /* GET CUSTOMER DETAILS */
  /* -------------------- */
  async getDetails(_id) {
    const existing = await Customer.exists({ _id });
    if (!existing) {
      throwError("مشتری با این مشخصات یافت نشد.", 404);
    }

    return await Customer.findById(_id);
  },

  /* -------------------- */
  /* DELETE CUSTOMER      */
  /* -------------------- */
  async delete(_id) {
    const existing = await Customer.exists({ _id });
    if (!existing) {
      throwError("مشتری با این مشخصات یافت نشد.", 404);
    }

    return await Customer.findByIdAndDelete(_id);
  },

  /* -------------------- */
  /* SIGNUP CUSTOMER      */
  /* -------------------- */
  async signup(data) {
    const customer = await this.create(data);

    const token = generateToken({
      id: customer._id,
      type: "customer",
    });

    const { password: _, ...customerData } = customer.toObject();
    return { customer: customerData, token };
  },

  /* -------------------- */
  /* LOGIN CUSTOMER       */
  /* -------------------- */
  async login(data) {
    const existing = await Customer.findOne({ phone: data.phone });
    if (!existing) {
      throwError("مشخصات کاربری اشتباه است.", 401);
    }

    const isMatch = await bcrypt.compare(data.password, existing.password);
    if (!isMatch) {
      throwError("مشخصات کاربری اشتباه است.", 401);
    }

    const token = generateToken({
      id: existing._id,
      type: "customer",
    });

    const { password: _, ...customerData } = existing.toObject();
    return { customer: customerData, token };
  },

  /* -------------------- */
  /* DASHBOARD DATA       */
  /* -------------------- */
  async getDashboardData() {
    return await Customer.countDocuments();
  },
};

module.exports = customerService;
