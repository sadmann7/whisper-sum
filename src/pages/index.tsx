import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  link: z
    .string()
    .url({
      message: "Please enter a valid youtube video link",
    })
    .regex(/(youtube.com|youtu.be)/),
});
type Inputs = z.infer<typeof schema>;

export default function Home() {
  // react-hook-form
  const { register, handleSubmit, formState } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>WhisperSum - Summarize Audio and Video Content with AI</title>
      </Head>
      <main className="container mx-auto mt-32 mb-16 flex flex-col items-center justify-center gap-12 px-6">
        <div className="grid max-w-3xl place-items-center gap-5">
          <h1 className="text-center text-4xl font-bold leading-tight text-gray-50 sm:text-6xl sm:leading-tight">
            Summarize Audio and Video Content with AI
          </h1>
          <p className="text-center text-lg text-gray-400 sm:text-xl">
            WhisperSum is an AI-powered web application that transcribes audio
            and video content into text and summarize it into bite-sized pieces
          </p>
        </div>
        <form
          aria-label="summarization form"
          className="mx-auto grid w-full max-w-xl gap-6"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <fieldset className="grid gap-4">
            <label
              htmlFor="link"
              className="text-sm font-medium text-white sm:text-base"
            >
              Input youtube video link
            </label>
            <input
              type="text"
              id="link"
              className="w-full rounded-md border-gray-400 bg-transparent px-4 py-2.5 text-base text-gray-50 transition-colors placeholder:text-gray-400"
              placeholder="https://www.youtube.com/watch?v=..."
              {...register("link")}
            />
            {formState.errors.link?.message ? (
              <p className="text-sm text-red-500 font-medium">
                {formState.errors.link.message}
              </p>
            ) : null}
          </fieldset>
          <Button>Summarize</Button>
        </form>
      </main>
    </>
  );
}
