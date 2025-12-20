"use server";

import connectDB from "@/server/db";
import { mediaService } from "@/server/modules/media/media.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import { uploadSchema, updateSchema } from "@/validation/media.validation";
import { serialize } from "@/lib/request";
import path from "path";
import { updateMinioFile, uploadToMinio } from "@/lib/minio";

/* -------------------- */
/* GET ALL MEDIA         */
/* -------------------- */
export async function getAllMedia(query = {}) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const { items, total } = await mediaService.getAll(query);

    return { data: serialize({ items, total, ...query }) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* UPLOAD MEDIA          */
/* -------------------- */
export async function uploadMedia(formData) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const file = formData.get("file");
    const existingFile = formData.get("existingFile");

    const body = Object.fromEntries(formData.entries());
    delete body.file;
    delete body.existingFile;

    const data = await validate(uploadSchema, body);

    let savedFile;

    if (file && file.arrayBuffer) {
      const ext = path.extname(file.name);
      const baseName = path.basename(file.name, ext);
      const fileName = `${Date.now()}-${baseName}${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      const { publicUrl } = await uploadToMinio({
        buffer,
        fileName,
        mimeType: file.type || "application/octet-stream",
      });

      savedFile = {
        path: publicUrl, // 🔥 URL مستقیم
        filename: fileName, // برای delete
        originalname: file.name,
        mimetype: file.type,
        size: file.size,
      };
    } else {
      throw Object.assign(new Error("فایل الزامی است."), { statusCode: 400 });
    }

    await mediaService.upload({ file: savedFile, body: data });

    return { message: "مدیا با موفقیت بارگزاری شد." };
  } catch (error) {
    console.log(error);
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* UPDATE MEDIA          */
/* -------------------- */
export async function updateMedia(id, formData) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    // New file OR existing file
    const file = formData.get("file");
    const existingFile = formData.get("existingFile");

    const body = Object.fromEntries(formData.entries());
    delete body.file;
    delete body.existingFile;

    const data = await validate(updateSchema, body);

    let savedFile;

    if (file && file.arrayBuffer) {
       const ext = path.extname(file.name);
      const baseName = path.basename(file.name, ext);
      const fileName = `${Date.now()}-${baseName}${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      const { publicUrl } = await updateMinioFile({
        buffer,
        fileName,
        mimeType: file.type || "application/octet-stream",
      });

      savedFile = {
        path: publicUrl, // 🔥 URL مستقیم
        filename: fileName, // برای delete
        originalname: file.name,
        mimetype: file.type,
        size: file.size,
      };
    } else if (existingFile) {
      // Use existing file
      const baseName = path.basename(existingFile);
      savedFile = {
        path: existingFile,
        filename: baseName,
        originalname: baseName,
        mimetype: "application/octet-stream",
        size: 0,
      };
    } else {
      throw Object.assign(new Error("فایل الزامی است."), { statusCode: 400 });
    }

    console.log({ file: savedFile, body: data });

    await mediaService.update(id, { file: savedFile, body: data });

    return { message: "مدیا با موفقیت به روز رسانی شد." };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* DELETE MEDIA          */
/* -------------------- */
export async function deleteMedia(_id) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const media = await mediaService.delete(_id);

    return { message: `مدیا ${media.originalName} با موفقیت حذف شد.` };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET MEDIA DETAILS     */
/* -------------------- */
export async function getMediaDetails(filter = {}) {
  try {
    await connectDB();

    const media = await mediaService.getDetails(filter);

    return { data: serialize(media) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}
