import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = ({ idea, setIdea, onValidate }) => {
  return (
    <section className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-text leading-[1.1]">
          Validate Your <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent italic animate-pulse">
            Hackathon Idea
          </span>
        </h1>
        <p className="text-secondary-text text-lg max-w-xl mx-auto">
          AI-driven analysis to judge your concept in seconds. 
          Don't waste 24 hours on the wrong project.
        </p>
      </div>

      <div className="relative group max-w-2xl mx-auto">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative flex flex-col gap-4">
          <div className="relative">
            <textarea
              placeholder="Describe your project idea in detail..."
              className="neon-input flex-grow min-h-[160px] resize-none text-lg pr-12 font-medium"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), onValidate())}
            />
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-muted-text uppercase tracking-widest">
              [ Input Terminal Ready ]
            </div>
          </div>
          
          <button 
            onClick={onValidate}
            disabled={!idea.trim()}
            className="neon-button w-full flex items-center justify-center gap-3 group/btn text-lg py-4"
          >
            <span className="tracking-[0.2em]">VALIDATE CONCEPT</span>
            <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
