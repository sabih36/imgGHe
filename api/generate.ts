import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Define the type locally to avoid pathing issues in the serverless environment
type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { prompt, aspectRatio } = req.body;

  if (!prompt || !aspectRatio) {
    return res.status(400).json({ error: 'Missing "prompt" or "aspectRatio" in request body.' });
  }

  if (!process.env.API_KEY) {
    console.error('API_KEY environment variable not set on server.');
    return res.status(500).json({ error: 'The API key is not configured on the server. Please check deployment settings.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio as AspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
      return res.status(200).json({ imageUrl });
    } else {
      throw new Error("The API did not return any images.");
    }
  } catch (error) {
    console.error('Error in /api/generate handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return res.status(500).json({ error: `Failed to communicate with the Gemini API: ${errorMessage}` });
  }
}
