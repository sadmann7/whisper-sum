import FileInput from "@/components/ui/FileInput";
import { AlertCircle } from "lucide-react";
import Head from "next/head";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

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
              name="file"
              setValue={setValue}
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
