import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

type DeploymentStatus = 'idle' | 'building' | 'complete' | 'failed';

interface UseDeploymentReturn {
  gitUrl: string;
  slug: string;
  deploymentStatus: DeploymentStatus;
  buildLogs: string[];
  deploymentUrl: string | null;
  handleGitUrlChange: (url: string) => void;
  handleSlugChange: (slug: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export const useDeployment = (): UseDeploymentReturn => {
  const [gitUrl, setGitUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus>('idle');
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleGitUrlChange = (url: string) => setGitUrl(url);
  const handleSlugChange = (slug: string) => setSlug(slug);

  useEffect(() => {
    if (!projectId) return;

    const socketServerUrl = 'http://localhost:9001';
    const newSocket = io(socketServerUrl);

    newSocket.on('connect', () => {
      console.log('Socket connected');
      newSocket.emit('subscribe', `logs:${projectId}`);
    });

    newSocket.on('message', (data) => {
      console.log('Received message:', data);
      setBuildLogs(prevLogs => [...prevLogs, data]);

      try {
        const parsedData = JSON.parse(data);
        if (parsedData.log && parsedData.log.includes('Upload Successful')) {
          setDeploymentStatus('complete');
        }
      } catch (e) {
        // Not JSON or other error, continue
        console.log(`Error: ${e}`);
      }
    });

    newSocket.on('error', (err) => {
      console.error('Socket error:', err);
      setError(`WebSocket error: ${err.message}`);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [projectId]);

  const handleSubmit = useCallback(async () => {
    if (!gitUrl) {
      setError('Git repository URL is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBuildLogs([]);

    try {
      const response = await fetch('http://localhost:9000/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          git_url: gitUrl,
          slug: slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to start deployment');
      }

      setProjectId(data.data.project_slug);
      setDeploymentUrl(`${data.data.project_slug}.localhost:8000`);
      setDeploymentStatus('building');
      setBuildLogs([`Starting build for ${gitUrl}...`]);
    } catch (err) {
      console.error('Deployment error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setDeploymentStatus('failed');
    } finally {
      setIsLoading(false);
    }
  }, [gitUrl, slug]);

  return {
    gitUrl,
    slug,
    deploymentStatus,
    buildLogs,
    deploymentUrl,
    handleGitUrlChange,
    handleSlugChange,
    handleSubmit,
    isLoading,
    error,
  };
};