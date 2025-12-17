const fs = require("fs");
const path = require("path");
const throwError = require("../../middlewares/throw-error");
const Media = require("./media.model");
const { buildMongoSort } = require("@/server/lib/filter");

const mediaService = {
  async exists(filter) {
    return await Media.findOne(filter);
  },

  async upload({ file, body }) {
    if (!file) {
      throwError("فایل الزامی است.", 400);
    }

    const media = new Media({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      originalName: file.originalname,
      extension: path.extname(file.originalname).replace(".", ""),
      mimeType: file.mimetype,
      size: file.size,
      ...body,
    });

    return await media.save();
  },

 async update(_id, data) {
  const existing = await this.exists({ _id });
  if (!existing) {
    throwError("مدیا وجود ندارد.", 404);
  }

  const updatedMedia = await Media.findByIdAndUpdate(
    _id,
    {
      filename: data.file.filename,
      path: data.file.path, // <-- use data.file.path instead of file.filename
      originalName: data.file.originalname,
      extension: path.extname(data.file.originalname).replace(".", ""),
      mimeType: data.file.mimetype,
      size: data.file.size,
      ...data.body,
    },
    { new: true }
  );

  return updatedMedia;
},


  async getDetails(filter) {
    const existing = await this.exists(filter);
    if (!existing) {
      throwError("مدیا وجود ندارد.", 404);
    }
    return existing;
  },

  async getAll({
    filter = {},
    sort = [{ field: "createdAt", order: "desc" }],
    page = 1,
    page_size = 1000,
  }) {
    const skip = (page - 1) * page_size;
    const sortOption = buildMongoSort(sort);

    const [items, total] = await Promise.all([
      Media.find(filter).sort(sortOption).skip(skip).limit(page_size),
      Media.countDocuments(filter),
    ]);

    return { items, total };
  },

  async delete(_id) {
    const existing = await this.exists({ _id });
    if (!existing) {
      throwError("مدیا وجود ندارد.", 404);
    }

    if (existing.path) {
      const filePath = path.join(
        process.cwd(),
        "public",
        existing.path.replace(/^\//, "")
      );

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error("File delete error:", err.message);
      }
    }

    return await Media.findByIdAndDelete(_id);
  },
};

module.exports = { mediaService };
