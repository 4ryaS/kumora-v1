import React from 'react';
import { GitBranch, Code, Rocket } from 'lucide-react';

interface RepositoryFormProps {
  gitUrl: string;
  slug: string;
  onGitUrlChange: (url: string) => void;
  onSlugChange: (slug: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

const RepositoryForm: React.FC<RepositoryFormProps> = ({
  gitUrl,
  slug,
  onGitUrlChange,
  onSlugChange,
  onSubmit,
  isLoading,
  error
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="glassmorphism rounded-lg p-6 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <Code className="w-6 h-6 text-cyan-400 glow-cyan" />
          <h2 className="text-xl font-orbitron font-bold text-cyan-100 ml-2">Deploy Your Repository</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="gitUrl" className="block mb-2 text-sm font-medium text-cyan-200 flex items-center">
              <GitBranch className="w-4 h-4 mr-2 text-cyan-400" />
              Git Repository URL
            </label>
            <input
              type="text"
              id="gitUrl"
              value={gitUrl}
              onChange={(e) => onGitUrlChange(e.target.value)}
              className="cyber-input w-full px-4 py-3 rounded-md text-cyan-100"
              placeholder="https://github.com/username/repository.git"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="slug" className="block mb-2 text-sm font-medium text-cyan-200 flex items-center">
              <span className="mr-2 text-cyan-400">#</span>
              Slug (Optional)
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              className="cyber-input w-full px-4 py-3 rounded-md text-cyan-100"
              placeholder="my-awesome-project"
            />
            <p className="mt-1 text-xs text-cyan-400/50">
              Leave empty to generate a random slug
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-900/20 text-red-400 rounded-md border border-red-700/50 animate-pulse">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="cyber-button w-full flex justify-center items-center px-6 py-3 rounded-md
                     text-cyan-100 font-orbitron"
          >
            {isLoading ? (
              <>
                <svg className="cyber-spin -ml-1 mr-3 h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5 mr-2 glow-cyan" />
                Deploy Now
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RepositoryForm;