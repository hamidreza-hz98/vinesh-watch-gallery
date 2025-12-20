import { Client } from "minio";

export const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: 443,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

export const BUCKET = process.env.MINIO_BUCKET; // media
export const PUBLIC_URL = process.env.MINIO_PUBLIC_URL;

export async function ensureBucket(bucketName) {
  const exists = await minioClient.bucketExists(bucketName);

  if (!exists) {
    await minioClient.makeBucket(bucketName);
    console.log(`✅ MinIO bucket "${bucketName}" created`);
  }
}



export async function uploadToMinio({ buffer, fileName, mimeType }) {
  await ensureBucket(process.env.MINIO_BUCKET);
  
  await minioClient.putObject(
    BUCKET,
    fileName,
    buffer,
    { "Content-Type": mimeType }
  );

  console.log(`${PUBLIC_URL}/${fileName}`);
  

  return {
    filename: fileName,
    publicUrl: `${PUBLIC_URL}/${fileName}`,
  };
}


export async function deleteFromMinio(fileName) {
  await minioClient.removeObject(BUCKET, fileName);
}

export async function updateMinioFile({
  newBuffer,
  newFileName,
  oldFileName,
  mimeType,
}) {
  await uploadToMinio({
    buffer: newBuffer,
    fileName: newFileName,
    mimeType,
  });

  if (oldFileName) {
    await deleteFromMinio(oldFileName);
  }
}