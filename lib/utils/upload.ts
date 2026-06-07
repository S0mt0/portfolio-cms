import { getUploadUrl } from "@/lib/actions/s3.actions";

export const uploadFileToS3 = async (
  file: File,
  folder: S3FileFolders = "documents",
  signal?: AbortSignal
) => {
  try {
    const { url, key } = await getUploadUrl(file.name, file.type, folder);

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
      signal,
    });

    if (!response.ok) {
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText}`
      );
    }

    return { url: url.split("?")[0], key };
  } catch (error) {
    console.error("Error Uploading to S3: ", error);
    throw error;
  }
};

export const handleFileUpload = async (
  source: File | React.ChangeEvent<HTMLInputElement>,
  folder: S3FileFolders,
  signal?: AbortSignal
) => {
  const file =
    typeof File !== "undefined" && source instanceof File
      ? source
      : (source as React.ChangeEvent<HTMLInputElement>).target.files?.[0];

  if (!file) return;

  return uploadFileToS3(file, folder, signal);
};
