import FileInput from "@/components/ui/FileInput";
import { AlertCircle } from "lucide-react";
import Head from "next/head";
import { useCallback, useState } from "react";
import type { ErrorCode, FileRejection } from "react-dropzone";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

type Inputs = {
  file: File | null;
};

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);

  // react-hook-form
  const { handleSubmit, formState, setValue } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  // register file input with react-hook-form
  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach(async (file) => {
        if (!file) return;
        setValue("file", file, {
          shouldValidate: true,
        });
      });
      rejectedFiles.forEach((file) => {
        setValue("file", null, {
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
    [setValue]
  );

  return (
    <>
      <Head>
        <title>
          WhisperSum - Summarize Your Audio and Video Content with AI
        </title>
      </Head>
      <main className="container mx-auto mt-32 mb-16 flex flex-col items-center justify-center gap-12 px-6">
        <div className="grid max-w-3xl place-items-center gap-5">
          <h1 className="text-center text-4xl font-bold leading-tight text-gray-50 sm:text-6xl sm:leading-tight">
            Summarize Your Audio and Video Content with AI
          </h1>
          <p className="text-center text-lg text-gray-400 sm:text-xl">
            WhisperSum is an AI-powered web application that lets you easily
            transcribe your audio and video content into text and summarize it
            into bite-sized pieces
          </p>
        </div>
        <form
          aria-label="edit photo form"
          className="mx-auto grid w-full max-w-xl gap-6"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <fieldset className="grid gap-5">
            <label
              htmlFor="image"
              className="text-sm font-medium text-white sm:text-base"
            >
              Select your file (audio or video)
            </label>
            <FileInput
              onDrop={onDrop}
              accept={{
                "audio/*": [".mp3", ".wav", ".ogg"],
                "video/*": [".m4a", ".mp4", ".mpeg", ".mpga", ".wav", ".webm"],
              }}
              maxSize={15 * 1024 * 1024}
              isUploading={isUploading}
            />
            {formState.errors.file?.message ? (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle aria-hidden="true" className="h-4 w-4" />
                <p className="text-sm font-medium">
                  {formState.errors.file.message}
                </p>
              </div>
            ) : null}
          </fieldset>
        </form>
      </main>
    </>
  );
}
