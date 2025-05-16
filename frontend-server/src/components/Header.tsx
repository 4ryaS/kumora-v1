import React from 'react';
import { Server } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="glassmorphism py-4 relative z-20">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <Server className="h-8 w-8 text-cyan-400 glow-cyan animate-pulse-glow" />
          </div>
          <h1 className="text-3xl font-orbitron font-bold text-cyan-100 ml-3">
            Kumora
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;