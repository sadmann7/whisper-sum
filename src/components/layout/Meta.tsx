import Head from "next/head";

type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  sitename?: string;
};

const Meta = ({
  title = "WhisperSum - Summarize Your Audio and Video Content with AI",
  sitename = "WhisperSum - Summarize Your Audio and Video Content with AI",
  description = "WhisperSum is an AI-powered web application that lets you easily transcribe your audio and video content into text and summarize it into bite-sized pieces",
  image = "https://whispersum.vercel.app/api/og?title=Video%20Digest&description=Summarize%20Your%20Video%20Content%20with%20AI",
}: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:site_name" content={sitename} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default Meta;
