
import React from 'react';
import { AspectRatio } from '../types';

interface ImageGeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const aspectRatios: AspectRatio[] = ["1:1", "16:9", "9:16", "4:3", "3:4"];

const AspectRatioButton = ({ ratio, selectedRatio, setRatio, isLoading }: { ratio: AspectRatio, selectedRatio: AspectRatio, setRatio: (r: AspectRatio) => void, isLoading: boolean }) => {
    const isSelected = ratio === selectedRatio;
    return (
        <button
            type="button"
            onClick={() => setRatio(ratio)}
            disabled={isLoading}
            className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 ${isSelected ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {ratio}
        </button>
    );
}

export const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  isLoading,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl shadow-2xl space-y-6 border border-slate-700">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
          Your Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A cinematic shot of a raccoon in a library, wearing a monocle"
          className="w-full h-32 p-3 bg-slate-900 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Aspect Ratio
        </label>
        <div className="flex gap-2">
            {aspectRatios.map(r => (
                <AspectRatioButton key={r} ratio={r} selectedRatio={aspectRatio} setRatio={setAspectRatio} isLoading={isLoading}/>
            ))}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !prompt}
        className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Image'
        )}
      </button>
    </form>
  );
};
