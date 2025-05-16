import React, { useState } from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';

interface ResultPanelProps {
  deploymentUrl: string | null;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ deploymentUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (deploymentUrl) {
      navigator.clipboard.writeText(deploymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glassmorphism rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 rounded-full bg-green-500 glow-green animate-pulse mr-2"></div>
        <h3 className="text-lg font-orbitron font-bold text-cyan-100">Deployment Complete</h3>
      </div>
      
      {deploymentUrl ? (
        <>
          <div className="animate-fadeIn">
            <div className="mb-6">
              <p className="text-cyan-200 mb-2 font-medium">Your site is live at:</p>
              <div className="cyber-input flex items-center rounded p-3">
                <span className="text-cyan-400 font-jetbrains flex-1 truncate">{deploymentUrl}</span>
                <button 
                  onClick={handleCopy}
                  className="ml-2 text-cyan-400 hover:text-cyan-300 focus:outline-none p-1 transition-colors duration-300"
                  title="Copy URL"
                >
                  {copied ? <Check className="h-5 w-5 text-green-500 glow-green" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <a 
              href={deploymentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="cyber-button inline-flex items-center justify-center px-4 py-2 rounded-md
                       text-cyan-100 font-orbitron"
            >
              <ExternalLink className="h-4 w-4 mr-2 glow-cyan" />
              Visit Site
            </a>
          </div>
          
          <div className="mt-auto pt-6 border-t border-cyan-500/20 mt-6">
            <h4 className="text-sm font-medium text-cyan-200 mb-2 font-orbitron">Deployment Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="cyber-input p-3 rounded">
                <p className="text-xs text-cyan-400/50">Status</p>
                <p className="text-sm text-green-400 font-medium font-jetbrains">Success</p>
              </div>
              <div className="cyber-input p-3 rounded">
                <p className="text-xs text-cyan-400/50">Branch</p>
                <p className="text-sm text-cyan-100 font-medium font-jetbrains">main</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-cyan-400/50 font-jetbrains">
          <svg className="cyber-spin mr-3 h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating deployment URL...
        </div>
      )}
    </div>
  );
};

export default ResultPanel;