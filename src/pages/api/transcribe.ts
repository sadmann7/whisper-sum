import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  transcribedText: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { file } = req.body;

  const transcription = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: file,
    }
  );

  const transcriptionJson = await transcription.json();
  res.status(200).json({ transcribedText: transcriptionJson.text });
}
