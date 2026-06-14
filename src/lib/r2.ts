import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function getPresignedUploadUrl(
  fileName: string,
  fileType: string,
): Promise<{ url: string; fields: Record<string, string>; key: string }> {
  const key = `uploads/${Date.now()}-${fileName}`;

  const { url, fields } = await createPresignedPost(r2Client, {
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    Conditions: [
      ["content-length-range", 0, 10 * 1024 * 1024], // 10 MB max
      ["starts-with", "$Content-Type", ""],
    ],
    Fields: {
      "Content-Type": fileType,
    },
    Expires: 600, // 10 minutes
  });

  return { url, fields, key };
}
