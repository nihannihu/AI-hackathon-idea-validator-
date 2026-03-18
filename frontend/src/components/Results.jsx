import React from 'react';
import { 
  Lightbulb, 
  Target, 
  Zap, 
  Flame, 
  Rocket, 
  Code2, 
  Cpu 
} from 'lucide-react';

const Results = ({ scores, onReset }) => {
  const getScoreColor = (score) => {
    if (score >= 70) return 'text-success border-success/30 bg-success/5';
    if (score >= 40) return 'text-warning border-warning/30 bg-warning/5';
    return 'text-danger border-danger/30 bg-danger/5';
  };

  const metrics = [
    { label: 'Originality', score: scores.originality, icon: Lightbulb },
    { label: 'Feasibility', score: scores.feasibility, icon: Target },
    { label: 'Impact', score: scores.impact, icon: Zap },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Report Header */}
      <div className="flex justify-between items-end border-b border-border-color pb-6">
        <div>
          <h2 className="text-4xl font-black text-primary-text uppercase tracking-tighter">Verdict Report</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-mono text-muted-text uppercase tracking-[0.2em]">ID: V8-2026-AR-99</span>
            <div className="w-1 h-1 bg-border-color rounded-full"></div>
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">Analysis Complete</span>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="text-[10px] text-muted-text hover:text-primary transition-colors uppercase font-bold tracking-[0.3em] border border-border-color px-4 py-2 rounded-lg hover:border-primary/50"
        >
          Reset Session
        </button>
      </div>

      {/* Scorecard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((item, idx) => (
          <div key={idx} className={`neon-card flex flex-col items-center text-center space-y-4 group transition-all duration-500 hover:scale-[1.02] ${getScoreColor(item.score).split(' ')[1]}`}>
            <div className={`p-4 rounded-2xl border ${getScoreColor(item.score).split(' ')[1]} ${getScoreColor(item.score).split(' ')[2]}`}>
              <item.icon className={`w-8 h-8 ${getScoreColor(item.score).split(' ')[0]}`} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-text">{item.label}</span>
            <div className={`text-6xl font-black italic tracking-tighter transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(0,245,212,0.3)] ${getScoreColor(item.score).split(' ')[0]}`}>
              {item.score}<span className="text-xl font-normal not-italic text-muted-text ml-1 mb-4 select-none opacity-50">/100</span>
            </div>
            <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden border border-border-color">
              <div 
                className={`h-full transition-all duration-[1.5s] ease-out ${getScoreColor(item.score).split(' ')[0].replace('text-', 'bg-')}`} 
                style={{ width: `${item.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Roast & Refine */}
      <div className="neon-card relative overflow-hidden group border-danger/30 hover:border-danger/50 shadow-danger/5">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
          <Flame className="w-48 h-48 text-danger" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-danger/10 rounded-lg">
              <Flame className="w-5 h-5 text-danger" />
            </div>
            <h3 className="font-black uppercase tracking-[0.2em] text-danger text-sm">System Roast</h3>
          </div>
          <p className="text-lg text-primary-text leading-relaxed font-medium italic pl-4 border-l-2 border-danger/30 mb-2">
            "Your idea is essentially a 'Hello World' for the blockchain. It's technically feasible but socially redundant. To make this work, stop focusing on the NFT aspect and start solving the actual data provenance issue for medical supplies."
          </p>
          <p className="text-xs text-muted-text font-mono mt-4 uppercase tracking-widest">
            {'> '} Recommendation: Narrow scope by 40% and double-down on hardware integration.
          </p>
        </div>
      </div>

      {/* MVP & Tech Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="neon-card space-y-6 bg-surface/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-black uppercase tracking-[0.2em] text-primary text-sm">MVP Roadmap (24H)</h3>
          </div>
          <ul className="space-y-4">
            {[
              { id: '01', title: 'Hardware Interface', desc: 'Secure sensor data ingestion layer' },
              { id: '02', title: 'Truth-Log Engine', desc: 'Immutable audit trail on Supabase' },
              { id: '03', title: 'Admin Terminal', desc: 'Real-time monitoring and alert UI' }
            ].map((feat, i) => (
              <li key={i} className="flex gap-4 group cursor-default">
                <span className="text-xs font-black text-primary/30 mt-1 font-mono tracking-tighter group-hover:text-primary transition-colors">{feat.id}</span>
                <div>
                  <h4 className="font-bold text-primary-text text-sm uppercase tracking-tight group-hover:text-primary transition-colors">{feat.title}</h4>
                  <p className="text-xs text-muted-text mt-1 group-hover:text-secondary-text transition-colors">{feat.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="neon-card space-y-6 bg-surface/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Code2 className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-black uppercase tracking-[0.2em] text-secondary text-sm">Target Tech Stack</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Next.js 15", category: "Core" },
              { name: "Tailwind CSS", category: "UI" },
              { name: "Supabase", category: "Backend" },
              { name: "Edge Functions", category: "Compute" },
              { name: "MQTT.js", category: "Protocol" },
              { name: "Zustand", category: "State" }
            ].map((tech, i) => (
              <div key={i} className="p-3 bg-background/50 border border-border-color rounded-xl flex items-center gap-3 group hover:border-secondary transition-all hover:-translate-y-0.5">
                <Cpu className="w-4 h-4 text-secondary/40 group-hover:text-secondary transition-colors" />
                <div>
                  <div className="text-[11px] font-black text-primary-text uppercase tracking-tight">{tech.name}</div>
                  <div className="text-[9px] text-muted-text uppercase tracking-[0.1em]">{tech.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
