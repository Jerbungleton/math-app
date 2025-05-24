import { useEffect, useRef, useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import './MathInput.css';

let stylesInitialized = false;

function initializeMathQuillStyles() {
  if (!stylesInitialized) {
    try {
      addStyles();
      stylesInitialized = true;
    } catch (error) {
      console.error('Error initializing MathQuill styles:', error);
      throw error;
    }
  }
}

const commonSymbols = [
  { symbol: '×', latex: '\\times' },
  { symbol: '÷', latex: '\\div' },
  { symbol: '±', latex: '\\pm' },
  { symbol: '²', latex: '^2' },
  { symbol: '³', latex: '^3' },
  { symbol: '√', latex: '\\sqrt{}' },
  { symbol: 'π', latex: '\\pi' },
  { symbol: '∞', latex: '\\infty' },
  { symbol: '≠', latex: '\\neq' },
  { symbol: '≤', latex: '\\leq' },
  { symbol: '≥', latex: '\\geq' }
];

const MathInput = ({ initialValue = '', onChange, placeholder = 'Enter your answer...' }) => {
  const mathFieldRef = useRef(null);
  const latexValue = useRef(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      initializeMathQuillStyles();
      setIsLoaded(true);
    } catch (err) {
      setError(err.message);
      console.error('Failed to initialize MathInput:', err);
    }
  }, []);

  useEffect(() => {
    // Update the field if initialValue changes externally
    if (mathFieldRef.current && initialValue !== latexValue.current) {
      mathFieldRef.current.latex(initialValue);
      latexValue.current = initialValue;
    }
  }, [initialValue]);

  const handleChange = (mathField) => {
    latexValue.current = mathField.latex();
    if (onChange) {
      // Try to evaluate the latex to a number if possible
      try {
        // Replace some common latex commands with their numeric equivalents
        let evalStr = mathField.latex()
          .replace('\\cdot', '*')
          .replace('\\times', '*')
          .replace('\\div', '/')
          .replace('\\pi', 'Math.PI')
          .replace(/\^(\d+)/g, '**$1'); // Handle powers
        
        // Only evaluate if it's a simple numeric expression
        if (/^[\d\s+\-*/(). ]*$/.test(evalStr)) {
          const result = eval(evalStr);
          onChange(isNaN(result) ? mathField.latex() : result);
        } else {
          onChange(mathField.latex());
        }
      } catch (e) {
        // If evaluation fails, just pass the latex
        onChange(mathField.latex());
      }
    }
  };

  const insertSymbol = (latex) => {
    if (mathFieldRef.current) {
      mathFieldRef.current.cmd(latex);
      mathFieldRef.current.focus();
    }
  };
  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <p className="text-red-600">Unable to load math input: {error}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="math-input-container">
        <div className="p-2 text-gray-600">Loading math input...</div>
      </div>
    );
  }

  return (
    <div className="math-input-container">
      <EditableMathField
        ref={mathFieldRef}
        latex={initialValue}
        onChange={handleChange}
        config={{
          spaceBehavesLikeTab: true,
          leftRightIntoCmdGoes: 'up',
          restrictMismatchedBrackets: true,
          sumStartsWithNEquals: true,
          supSubsRequireOperand: true,
          autoCommands: 'pi theta sqrt sum',
          autoOperatorNames: 'sin cos tan',
          handlers: {
            enter: () => false // Prevent newlines
          }
        }}
      />
      <div className="math-symbols-toolbar">
        {commonSymbols.map((item) => (
          <button
            key={item.latex}
            className="symbol-button"
            onClick={() => insertSymbol(item.latex)}
            title={item.symbol}
          >
            {item.symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MathInput;
