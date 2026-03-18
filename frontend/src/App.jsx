import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Results from './components/Results';

const App = () => {
  const [idea, setIdea] = useState('');
  const [status, setStatus] = useState('idle'); // idle, analyzing, result
  const [loadingText, setLoadingText] = useState('Analyzing Idea...');
  const [scores, setScores] = useState({
    originality: 85,
    feasibility: 65,
    impact: 92
  });

  const analyzeIdea = () => {
    if (!idea.trim()) return;
    setStatus('analyzing');
    
    const phrases = [
      "Analyzing market saturation...",
      "Checking technical feasibility...",
      "Scanning existing GitHub repos...",
      "Evaluating scalability vectors...",
      "Generating roast profile...",
      "Finalizing verdict..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < phrases.length) {
        setLoadingText(phrases[i]);
        i++;
      } else {
        clearInterval(interval);
        // Randomize scores slightly for realism
        setScores({
          originality: Math.floor(Math.random() * 40) + 60,
          feasibility: Math.floor(Math.random() * 50) + 40,
          impact: Math.floor(Math.random() * 30) + 70,
        });
        setStatus('result');
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-primary overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {status === 'idle' && (
          <Hero 
            idea={idea} 
            setIdea={setIdea} 
            onValidate={analyzeIdea} 
          />
        )}

        {status === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-32 space-y-8 animate-in fade-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
              <Loader2 className="w-20 h-20 text-primary animate-spin relative" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl font-black font-mono tracking-widest text-primary animate-pulse uppercase italic">
                {loadingText}
              </p>
              <div className="w-48 h-1 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary to-transparent" style={{backgroundSize: '200% 100%'}}></div>
              </div>
            </div>
          </div>
        )}

        {status === 'result' && (
          <Results 
            scores={scores} 
            onReset={() => setStatus('idle')} 
          />
        )}
      </main>

      <footer className="relative z-10 py-16 text-center border-t border-border-color mt-20">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-text text-[10px] uppercase tracking-[0.4em] font-bold">
            Valid<span className="text-primary italic">8</span> OS v1.0.4 | Neural-Link Established
          </p>
          <div className="flex gap-6 opacity-30 hover:opacity-100 transition-opacity">
            <div className="w-1 h-1 bg-primary rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-secondary rounded-full animate-ping [animation-delay:0.2s]"></div>
            <div className="w-1 h-1 bg-primary rounded-full animate-ping [animation-delay:0.4s]"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
