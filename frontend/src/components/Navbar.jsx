import React from 'react';
import { Zap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Zap className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tighter uppercase italic text-primary-text">
          Valid<span className="text-primary italic">8</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 bg-surface border border-border-color rounded-full flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
          <span className="text-[10px] font-mono text-muted-text uppercase tracking-widest whitespace-nowrap">
            System Status: <span className="text-success">Operational</span>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
