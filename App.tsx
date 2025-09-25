import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageGeneratorForm } from './components/ImageGeneratorForm';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImage as generateImageService } from './services/geminiService';
import { AspectRatio } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const generatedImageUrl = await generateImageService(prompt, aspectRatio);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate image. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, isLoading]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-4xl mx-auto mt-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 flex-shrink-0">
          <ImageGeneratorForm
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            isLoading={isLoading}
            onSubmit={handleGenerate}
          />
        </div>
        <div className="flex-grow lg:w-2/3">
          <ImageDisplay
            imageUrl={imageUrl}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;