"use server";

import connectDB from "@/server/db";
import { mediaService } from "@/server/modules/media/media.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import { uploadSchema, updateSchema } from "@/validation/media.validation";
import { serialize } from "@/lib/request";
import fs from "fs";
import path from "path";
import { uploadToB2 } from "@/lib/b2";

import B2 from "backblaze-b2";

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

let authorized = false;
async function authorize() {
  if (!authorized) {
    await b2.authorize();
    authorized = true;
  }
}

/**
 * Fetch file from B2 and return buffer + content type
 */
export async function serveMediaBuffer(fileName) {
  await authorize();

  const { data } = await b2.getDownloadAuthorization({
    bucketId: process.env.B2_BUCKET_ID,
    fileNamePrefix: fileName,
    validDurationInSeconds: 3600,
  });

  const downloadUrl = `https://f003.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}?Authorization=${data.authorizationToken}`;

  const res = await fetch(downloadUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch file from B2");
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type");

  return { buffer, contentType };
}

/* -------------------- */
/* GET ALL MEDIA         */
/* -------------------- */
export async function getAllMedia(query = {}) {
  try {
    await connectDB();

    const auth = await authenticate();
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

    const auth = await authenticate();
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
      const fileName = `uploads/${Date.now()}-${baseName}${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      const { publicUrl, fileId } = await uploadToB2({
        buffer,
        fileName,
        mimeType: file.type || "application/octet-stream",
      });

      savedFile = {
        path: publicUrl, // 🔥 FULL URL
        filename: fileName, // used for delete
        originalname: file.name,
        mimetype: file.type,
        size: file.size,
      };
    } else if (existingFile) {
      savedFile = {
        path: existingFile,
        filename: path.basename(existingFile),
        originalname: path.basename(existingFile),
        mimetype: "application/octet-stream",
        size: 0,
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

    const auth = await authenticate();
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
      const fileName = `uploads/${Date.now()}-${baseName}${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      // Upload new file to B2
      const { publicUrl, fileId } = await uploadToB2({
        buffer,
        fileName,
        mimeType: file.type || "application/octet-stream",
      });

      // Delete old file from B2
      const existingMedia = await mediaService.getDetails({ _id: id });
      if (existingMedia?.fileId) {
        try {
          await deleteFromB2(existingMedia.filename, existingMedia.fileId);
        } catch (err) {
          console.error("Failed to delete old file:", err.message);
        }
      }

      savedFile = {
        path: publicUrl,
        filename: fileName,
        fileId, // save fileId for future deletes
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

    const auth = await authenticate();
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
