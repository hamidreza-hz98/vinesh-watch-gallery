import B2 from "backblaze-b2"

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
})

let authorized = false

async function authorize() {
  if (!authorized) {
    await b2.authorize()
    authorized = true
  }
}

export async function uploadToB2({ buffer, fileName, mimeType }) {
  await authorize()

  const { data: uploadUrlData } = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID,
  })

  const { data } = await b2.uploadFile({
    uploadUrl: uploadUrlData.uploadUrl,
    uploadAuthToken: uploadUrlData.authorizationToken,
    fileName,
    data: buffer,
    contentType: mimeType,
  })

    return {
    publicUrl: `/media/${encodeURIComponent(fileName)}`, // App Router proxy
    fileId: data.fileId,                               // save for deletion
  };
}

export async function deleteFromB2(fileName, fileId) {
  if (!fileId) throw new Error("fileId is required to delete a file from B2");

  await authorize();

  await b2.deleteFileVersion({
    fileName,
    fileId,
  });
}
