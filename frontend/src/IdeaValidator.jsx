import React, { useState } from 'react';

export default function IdeaValidator() {
  // State management
  const [ideaInput, setIdeaInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Core submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (!ideaInput.trim()) return;

    setIsLoading(true);
    setResults(null);

    try {
      // Mock asynchronous API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response based on the PRD
      const mockResponse = {
        scores: {
          originality: 85,
          feasibility: 70,
          impact: 90
        },
        feedback: "Solid idea, but execution could be tricky within 24 hours. Consider narrowing the scope to a specific crop type.",
        mvpFeatures: [
          "Image upload and classification for 1 specific crop",
          "Hardcoded fertilizer recommendation mapping",
          "Basic results display dashboard"
        ],
        techStack: [
          "React (Vite) for Frontend",
          "Node/Express backend",
          "Google Vision API (or similar pre-trained model)"
        ]
      };

      // Update final state
      setResults(mockResponse);
    } catch (error) {
      console.error("Error validating idea:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="validator-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Valid8: AI Hackathon Idea Validator</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <textarea
          value={ideaInput}
          onChange={(e) => setIdeaInput(e.target.value)}
          placeholder="Enter your hackathon idea (1-2 sentences)..."
          rows={4}
          style={{ padding: '0.5rem', width: '100%' }}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !ideaInput.trim()}
          style={{ padding: '0.5rem 1rem', alignSelf: 'flex-start' }}
        >
          {isLoading ? 'Processing...' : 'Validate Idea'}
        </button>
      </form>

      {/* Loading Skeleton/State */}
      {isLoading && (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <p>Analyzing Originality, Feasibility, and Impact...</p>
          {/* Skeleton representation */}
          <div style={{ height: '20px', backgroundColor: '#eee', marginBottom: '10px', width: '80%' }}></div>
          <div style={{ height: '20px', backgroundColor: '#eee', marginBottom: '10px', width: '60%' }}></div>
          <div style={{ height: '40px', backgroundColor: '#eee', width: '100%' }}></div>
        </div>
      )}

      {/* Results Scorecard */}
      {results && !isLoading && (
        <div className="scorecard" style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h2>The Scorecard</h2>
          
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
            <div><strong>Originality:</strong> {results.scores.originality}/100</div>
            <div><strong>Feasibility:</strong> {results.scores.feasibility}/100</div>
            <div><strong>Impact:</strong> {results.scores.impact}/100</div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <h3>Roast & Refine</h3>
            <p>{results.feedback}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h3>MVP Feature List (Strictly 3)</h3>
            <ul>
              {results.mvpFeatures.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Recommended Tech Stack & APIs</h3>
            <ul>
              {results.techStack.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
