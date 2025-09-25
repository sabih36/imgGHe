import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from '../types';

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set. Please configure it in your deployment settings.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("API did not return any images.");
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to communicate with the Gemini API.');
  }
};