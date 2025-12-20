"use server";

import connectDB from "@/server/db";
import tagService from "@/server/modules/tag/tag.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import { createTagSchema, updateTagSchema } from "@/validation/tag.validation";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE TAG           */
/* -------------------- */
export async function createTag(body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(createTagSchema, body);

    const tag = await tagService.create(data);

    return {
      message: `برچسب ${tag.name} با موفقیت ایجاد شد.`,
      data: serialize(tag)
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* GET ALL TAGS         */
/* -------------------- */
export async function getAllTags(query = {}) {
  try {
    await connectDB();

    const { tags, total } = await tagService.getAll(query);

    return {
      data: serialize({ tags, total, ...query }),
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* GET TAG DETAILS      */
/* -------------------- */
export async function getTagDetails(filter = {}) {
  try {
    await connectDB();

    const tag = await tagService.getDetails(filter);

    return {
      data: serialize(tag),
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* UPDATE TAG           */
/* -------------------- */
export async function updateTag(tagId, body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(updateTagSchema, body);
    const tag = await tagService.update(data, tagId);

    return {
      message: `برچسب ${tag.name} با موفقیت ویرایش شد.`,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* DELETE TAG           */
/* -------------------- */
export async function deleteTag(tagId) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const tag = await tagService.delete(tagId);

    return {
      message: `برچسب ${tag.name} با موفقیت حذف شد.`,
      data: serialize(tag)
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}
