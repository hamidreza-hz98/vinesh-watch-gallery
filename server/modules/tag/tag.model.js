const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamps = require("mongoose-timestamp");

const TagSchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String },
});

TagSchema.plugin(timestamps);

module.exports = mongoose.models.Tag || mongoose.model("Tag", TagSchema);
