import React, { useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface ConsoleProps {
  logs: string[];
}

const Console: React.FC<ConsoleProps> = ({ logs }) => {
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-full">
      <div className="terminal glassmorphism h-full flex flex-col rounded-lg overflow-hidden">
        <div className="bg-gray-950/80 px-4 py-3 border-b border-cyan-500/20 flex items-center">
          <Terminal className="w-5 h-5 text-cyan-400 glow-cyan mr-2" />
          <h3 className="text-lg font-orbitron text-cyan-100">Build Console</h3>
        </div>
        
        <div 
          ref={consoleRef}
          className="flex-1 p-4 font-jetbrains text-sm console-output overflow-y-auto"
          style={{ minHeight: "300px", maxHeight: "60vh" }}
        >
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-cyan-500/50">
              <span className="mr-2">$</span>
              <span className="animate-pulse">Waiting for build to start...</span>
            </div>
          ) : (
            logs.map((log, index) => {
              let jsonLog;
              try {
                jsonLog = JSON.parse(log);
              } catch {
                // Not JSON, use raw log
              }
              
              const logText = jsonLog?.log || log;
              
              return (
                <div 
                  key={index} 
                  className="terminal-line"
                >
                  <span className="text-cyan-500 mr-2">$</span>
                  <span>{logText}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Console;