import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function RatiosPage() {
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/pre-algebra" className="text-brand-primary hover:text-brand-primary-dark">
          ← Back to Pre-Algebra
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-brand-primary-dark text-center animate-fade-in">
        Ratios and Proportions
      </h1>

      <div className="content-card max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-brand-primary-dark">Understanding Ratios</h2>
        <p className="text-brand-text-dark mb-6 leading-relaxed">
          A ratio is a comparison between two or more related quantities. Ratios can be 
          written in different ways: using a colon (3:2), as a fraction (3/2), or with 
          the word "to" (3 to 2). Proportions are equations that show two ratios are equal.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-brand-primary-dark">Key Concepts:</h3>
          <ul className="list-disc list-inside space-y-2 text-brand-text-dark">
            <li>Ratios compare quantities with the same units</li>
            <li>Proportions are equations showing equal ratios</li>
            <li>Cross multiplication helps solve proportions</li>
            <li>Real-world applications include recipes and maps</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-brand-background rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-brand-primary-dark">Practice Problem</h3>
          <p className="text-brand-text-dark mb-4">
            If a recipe uses 2 cups of flour for every 3 cups of milk, how many cups of 
            flour are needed for 9 cups of milk?
          </p>
          
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="px-4 py-2 border border-brand-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Enter your answer"
            />
            <button
              onClick={() => {
                setShowAnswer(true);
                if (parseInt(userAnswer) === 6) {
                  setScore(score + 1);
                }
              }}
              className="px-6 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark"
            >
              Check Answer
            </button>
          </div>

          {showAnswer && (
            <div className="mt-4">
              <p className="text-brand-text-dark">
                {parseInt(userAnswer) === 6 
                  ? "Correct! Great job!" 
                  : "Not quite. Let's solve this using proportions:"}
              </p>
              {parseInt(userAnswer) !== 6 && (
                <div className="mt-2 text-brand-text-dark">
                  <p>1. Set up the proportion: 2/3 = x/9</p>
                  <p>2. Cross multiply: 3x = 2 × 9</p>
                  <p>3. Solve for x: x = (2 × 9) ÷ 3 = 18 ÷ 3 = 6</p>
                  <p>Therefore, you need 6 cups of flour for 9 cups of milk.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
