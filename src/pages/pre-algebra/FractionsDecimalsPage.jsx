import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function FractionsDecimalsPage() {
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
        Fractions and Decimals
      </h1>

      <div className="content-card max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-brand-primary-dark">Understanding Fractions</h2>
        <p className="text-brand-text-dark mb-6 leading-relaxed">
          A fraction represents a part of a whole. It consists of a numerator (top number) 
          and a denominator (bottom number). The numerator tells us how many parts we have, 
          while the denominator tells us how many equal parts the whole is divided into.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-brand-primary-dark">Converting Fractions to Decimals:</h3>
          <ul className="list-disc list-inside space-y-2 text-brand-text-dark">
            <li>Divide the numerator by the denominator</li>
            <li>The result is the decimal equivalent</li>
            <li>Some fractions convert to repeating decimals</li>
            <li>Common fractions like 1/2 = 0.5, 1/4 = 0.25 should be memorized</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-brand-background rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-brand-primary-dark">Practice Problem</h3>
          <p className="text-brand-text-dark mb-4">Convert 3/4 to a decimal:</p>
          
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              step="0.01"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="px-4 py-2 border border-brand-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Enter your answer"
            />
            <button
              onClick={() => {
                setShowAnswer(true);
                if (parseFloat(userAnswer) === 0.75) {
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
                {parseFloat(userAnswer) === 0.75 
                  ? "Correct! Great job!" 
                  : "Not quite. Let's solve this:"}
              </p>
              {parseFloat(userAnswer) !== 0.75 && (
                <div className="mt-2 text-brand-text-dark">
                  <p>To convert 3/4 to a decimal:</p>
                  <p>1. Divide 3 by 4</p>
                  <p>2. 3 ÷ 4 = 0.75</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
