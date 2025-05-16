import React, { ReactNode } from 'react';
import Header from './Header';
import ParticleBackground from './ParticleBackground';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-grid-pattern text-cyan-100 flex flex-col">
      <ParticleBackground />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>
      <footer className="border-t border-cyan-900/30 py-4 relative z-10">
        <div className="container mx-auto px-4 text-center text-cyan-500/50 text-sm font-jetbrains">
          <p>© 2025 Kumora. Build and deploy with confidence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;