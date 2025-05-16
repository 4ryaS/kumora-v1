import React, { useState } from 'react';
import RepositoryForm from './RepositoryForm';
import Console from './Console';
import ResultPanel from './ResultPanel';
import { useDeployment } from '../hooks/useDeployment';

const DeploymentDashboard: React.FC = () => {
  const [formVisible, setFormVisible] = useState(true);
  
  const {
    gitUrl,
    slug,
    deploymentStatus,
    buildLogs,
    deploymentUrl,
    handleGitUrlChange,
    handleSlugChange,
    handleSubmit,
    isLoading,
    error
  } = useDeployment();

  // Hide form once deployment starts
  React.useEffect(() => {
    if (deploymentStatus === 'building' || deploymentStatus === 'complete') {
      setFormVisible(false);
    }
  }, [deploymentStatus]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
      {formVisible && (
        <div className="lg:col-span-2">
          <RepositoryForm
            gitUrl={gitUrl}
            slug={slug}
            onGitUrlChange={handleGitUrlChange}
            onSlugChange={handleSlugChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        </div>
      )}
      
      {(deploymentStatus === 'building' || deploymentStatus === 'complete') && (
        <>
          <div className={deploymentStatus === 'complete' ? 'lg:col-span-1' : 'lg:col-span-2'}>
            <Console logs={buildLogs} />
          </div>
          
          {deploymentStatus === 'complete' && (
            <div className="lg:col-span-1">
              <ResultPanel deploymentUrl={deploymentUrl} />
            </div>
          )}
        </>
      )}
      
      {deploymentStatus !== 'idle' && (
        <div className="lg:col-span-2 flex justify-center">
          <button 
            onClick={() => setFormVisible(!formVisible)}
            className="bg-gray-800 text-teal-400 border border-teal-400 px-4 py-2 rounded 
                      hover:bg-teal-900 hover:text-white transition-colors duration-300
                      flex items-center space-x-2"
          >
            <span>{formVisible ? 'Hide Form' : 'Show Form'}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform ${formVisible ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DeploymentDashboard;