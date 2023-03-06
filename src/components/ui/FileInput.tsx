import { DownloadCloud, Loader2 } from "lucide-react";
import {
  useDropzone,
  type Accept,
  type DropEvent,
  type FileRejection
} from "react-dropzone";

type FileInputProps = {
  onDrop:
    | (<T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
      ) => void)
    | undefined;
  accept?: Accept;
  maxSize: number;
  maxFiles?: number;
  isUploading: boolean;
  className?: string;
};

const FileInput = ({
  onDrop,
  maxSize,
  maxFiles = 1,
  accept = {
    "image/png": [],
    "image/jpeg": [],
  },
  isUploading,
  className = "",
}: FileInputProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
  });

  return (
    <div
      {...getRootProps()}
      className={`grid h-60 w-full min-w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed p-2 text-center text-base text-gray-300 transition hover:bg-gray-700/80 disabled:cursor-not-allowed ${
        isDragActive ? "border-gray-500" : "border-gray-500"
      } ${className}}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="grid place-items-center gap-2 px-10">
          <DownloadCloud aria-hidden="true" className="h-8 w-8" />
          <p>Drop the file here</p>
        </div>
      ) : isUploading ? (
        <Loader2 className="h-8 w-8 animate-spin" />
      ) : (
        <div className="grid place-items-center gap-2 px-10">
          <DownloadCloud aria-hidden="true" className="h-8 w-8" />
          <p className="font-medium">
            Drag {`'n'`} drop file here, or click to select file
          </p>
          <p className="text-sm text-gray-400">
            Please upload file with size less than{" "}
            {Math.round(maxSize / 1000000)}MB
          </p>
        </div>
      )}
    </div>
  );
};

export default FileInput;
