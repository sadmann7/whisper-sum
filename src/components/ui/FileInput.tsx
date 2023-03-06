import { DownloadCloud, Loader2 } from "lucide-react";
import { useCallback } from "react";
import {
  ErrorCode,
  useDropzone,
  type Accept,
  type FileRejection,
} from "react-dropzone";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { toast } from "react-hot-toast";

type FileInputProps<TInputs extends FieldValues> = {
  name: Path<TInputs>;
  setValue: UseFormSetValue<TInputs>;
  accept?: Accept;
  maxSize: number;
  maxFiles?: number;
  isUploading: boolean;
  className?: string;
};

const FileInput = <TInputs extends FieldValues>({
  name,
  setValue,
  maxSize,
  maxFiles = 1,
  accept = {
    "image/png": [],
    "image/jpeg": [],
  },
  isUploading,
  className = "",
}: FileInputProps<TInputs>) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach(async (file) => {
        if (!file) return;
        setValue(name, file as PathValue<TInputs, Path<TInputs>>, {
          shouldValidate: true,
        });
      });
      rejectedFiles.forEach((file) => {
        setValue(name, null as PathValue<TInputs, Path<TInputs>>, {
          shouldValidate: true,
        });

        switch (file.errors[0]?.code as ErrorCode) {
          case "file-invalid-type":
            toast.error("Please select a audio or video file");
            break;
          case "file-too-large":
            const size = (file.file.size / 1024 / 1024).toFixed(2);
            toast.error(
              `Please select a file smaller than 15MB. Current size: ${size}MB`
            );
            break;
          case "too-many-files":
            toast.error("Please select only one file");
            break;
          default:
            toast.error(file.errors[0]?.message);
            break;
        }
      });
    },
    [name, setValue]
  );

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
