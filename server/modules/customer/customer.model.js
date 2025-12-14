const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const timestamps = require("mongoose-timestamp");

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    default: "",
  },
  lastName: {
    type: String,
    required: true,
    default: "",
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  birthdate: {
    type: Date,
  },
});

CustomerSchema.plugin(timestamps);

CustomerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

CustomerSchema.index({ firstName: 1, lastName: 1 });
CustomerSchema.index({ birthdate: 1 });
CustomerSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
