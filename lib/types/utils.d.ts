type S3FileFolders = "notes" | "documents" | "media";

type UploadType = "image" | "document";

type TFile = File | React.ChangeEvent<HTMLInputElement>;

type UploadOptions = {
  onComplete?: (url: string) => void;
  onError?: (url: string) => void;
  folder?: S3FileFolders;
  signal?: AbortSignal;
};

interface ActionResult<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}
