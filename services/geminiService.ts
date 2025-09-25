import { AspectRatio } from '../types';

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, aspectRatio }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "An unknown error occurred on the server." }));
        const message = errorData.error || `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();

    if (data.imageUrl) {
        return data.imageUrl;
    } else {
        throw new Error("API response did not contain an image URL.");
    }
  } catch (error) {
    console.error('Error fetching from /api/generate endpoint:', error);
    // Re-throw the error so the UI component can catch it and display a message.
    throw error;
  }
};
