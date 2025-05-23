import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { generateProblem, generateQuiz } from '../../utils/mathProblemGenerator';
import { defaultFlashcards } from '../../utils/defaultFlashcards';

const practiceProblemsList = [
  {
    question: "What is 12 + 5?",
    answer: 17,
    solution: ["12 + 5 = 17"]
  },
  {
    question: "What is 15 - 7?",
    answer: 8,
    solution: ["15 - 7 = 8"]
  },
  {
    question: "What is 6 × 4?",
    answer: 24,
    solution: ["6 × 4 = 4 + 4 + 4 + 4 + 4 + 4 = 24"]
  },
  {
    question: "What is 20 ÷ 5?",
    answer: 4,
    solution: ["20 ÷ 5 = 4 because 5 × 4 = 20"]
  }
];

export default function BasicOperationsPage() {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [currentProblem, setCurrentProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [currentPracticeProblem, setCurrentPracticeProblem] = useState(generateProblem('easy'));
  const [quizQuestions, setQuizQuestions] = useState(generateQuiz(4, 'easy'));
  
  // Flashcard states
  const [showFlashcard, setShowFlashcard] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flashcardMode, setFlashcardMode] = useState('premade'); // 'premade' or 'custom'
  const [flashcards, setFlashcards] = useState(defaultFlashcards);
  const [userFlashcards, setUserFlashcards] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');
  const [editingCard, setEditingCard] = useState(null);

  // Load user flashcards from localStorage on component mount
  useEffect(() => {
    const savedCards = localStorage.getItem('basicOperationsFlashcards');
    if (savedCards) {
      setUserFlashcards(JSON.parse(savedCards));
    }
  }, []);

  // Save user flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('basicOperationsFlashcards', JSON.stringify(userFlashcards));
  }, [userFlashcards]);

  const handleAddCard = () => {
    if (newCardFront.trim() && newCardBack.trim()) {
      if (editingCard) {
        setUserFlashcards(userFlashcards.map(card => 
          card.id === editingCard.id 
            ? { ...card, front: newCardFront, back: newCardBack }
            : card
        ));
        setEditingCard(null);
      } else {
        const newCard = {
          id: `user-${Date.now()}`,
          front: newCardFront,
          back: newCardBack
        };
        setUserFlashcards([...userFlashcards, newCard]);
      }
      setNewCardFront('');
      setNewCardBack('');
      setShowAddCard(false);
    }
  };

  const handleDeleteCard = (cardId) => {
    setUserFlashcards(userFlashcards.filter(card => card.id !== cardId));
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setNewCardFront(card.front);
    setNewCardBack(card.back);
    setShowAddCard(true);
  };

  const activeFlashcards = flashcardMode === 'premade' ? defaultFlashcards : userFlashcards;

  const handleNextProblem = () => {
    if (currentProblem < practiceProblemsList.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setShowAnswer(false);
      setUserAnswer('');
    }
  };

  const handlePrevProblem = () => {
    if (currentProblem > 0) {
      setCurrentProblem(currentProblem - 1);
      setShowAnswer(false);
      setUserAnswer('');
    }
  };

  const handleQuizAnswer = (selectedIndex) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(selectedIndex);
      if (selectedIndex === quizQuestions[currentQuizQuestion].correctAnswer) {
        setQuizScore(quizScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowQuizResult(true);
    }
  };

  const handleNewPracticeProblem = () => {
    setCurrentPracticeProblem(generateProblem(difficulty));
    setShowAnswer(false);
    setUserAnswer('');
  };

  const startNewQuiz = () => {
    setQuizQuestions(generateQuiz(4, difficulty));
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setShowQuizResult(false);
    setSelectedAnswer(null);
  };

  const handleNextFlashcard = () => {
    setCurrentFlashcard((prev) => 
      prev === flashcards.length - 1 ? 0 : prev + 1
    );
    setShowFlashcard(false);
  };

  const handlePrevFlashcard = () => {
    setCurrentFlashcard((prev) => 
      prev === 0 ? flashcards.length - 1 : prev - 1
    );
    setShowFlashcard(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/pre-algebra" className="text-brand-primary hover:text-brand-primary-dark">
          ← Back to Pre-Algebra
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-8 text-brand-primary-dark text-center animate-fade-in">
        Basic Operations
      </h1>

      <div className="mb-8">
        <div className="flex gap-4 justify-center mb-4">
          <button
            onClick={() => setActiveTab('getting-started')}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'getting-started'
                ? 'bg-brand-primary text-brand-text-light'
                : 'bg-brand-surface text-brand-text-dark'
            }`}
          >
            Getting Started
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'practice'
                ? 'bg-brand-primary text-brand-text-light'
                : 'bg-brand-surface text-brand-text-dark'
            }`}
          >
            Practice Mode
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'quiz'
                ? 'bg-brand-primary text-brand-text-light'
                : 'bg-brand-surface text-brand-text-dark'
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'flashcards'
                ? 'bg-brand-primary text-brand-text-light'
                : 'bg-brand-surface text-brand-text-dark'
            }`}
          >
            Flashcards
          </button>
        </div>

        {(activeTab === 'practice' || activeTab === 'quiz') && (
          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={() => {
                setDifficulty('easy');
                if (activeTab === 'practice') {
                  setCurrentPracticeProblem(generateProblem('easy'));
                  setShowAnswer(false);
                  setUserAnswer('');
                }
                if (activeTab === 'quiz') startNewQuiz('easy');
              }}
              className={`px-4 py-1 rounded-lg text-sm transition-colors duration-300 ${
                difficulty === 'easy'
                  ? 'bg-green-500 text-white'
                  : 'bg-brand-surface text-brand-text-dark'
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => {
                setDifficulty('medium');
                if (activeTab === 'practice') {
                  setCurrentPracticeProblem(generateProblem('medium'));
                  setShowAnswer(false);
                  setUserAnswer('');
                }
                if (activeTab === 'quiz') startNewQuiz('medium');
              }}
              className={`px-4 py-1 rounded-lg text-sm transition-colors duration-300 ${
                difficulty === 'medium'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-brand-surface text-brand-text-dark'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => {
                setDifficulty('hard');
                if (activeTab === 'practice') {
                  setCurrentPracticeProblem(generateProblem('hard'));
                  setShowAnswer(false);
                  setUserAnswer('');
                }
                if (activeTab === 'quiz') startNewQuiz('hard');
              }}
              className={`px-4 py-1 rounded-lg text-sm transition-colors duration-300 ${
                difficulty === 'hard'
                  ? 'bg-red-500 text-white'
                  : 'bg-brand-surface text-brand-text-dark'
              }`}
            >
              Hard
            </button>
          </div>
        )}
      </div>

      {activeTab === 'getting-started' && (
        <div className="content-card max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-brand-primary-dark">Introduction</h2>
          <p className="text-brand-text-dark mb-6 leading-relaxed">
            Basic operations form the foundation of mathematics. These include addition (+), 
            subtraction (-), multiplication (×), and division (÷). Understanding these 
            operations and their properties is crucial for success in mathematics.
          </p>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary-dark">Key Concepts:</h3>
            <ul className="list-disc list-inside space-y-2 text-brand-text-dark">
              <li>Addition and subtraction are inverse operations</li>
              <li>Multiplication is repeated addition</li>
              <li>Division is repeated subtraction</li>
              <li>Order of operations (PEMDAS)</li>
            </ul>
          </div>

          <div className="mt-8 p-6 bg-brand-background rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handlePrevProblem}
                disabled={currentProblem === 0}
                className={`px-4 py-2 rounded-lg ${currentProblem === 0 ? 'bg-gray-300' : 'bg-brand-primary text-brand-text-light'}`}
              >
                Previous
              </button>
              <h3 className="text-xl font-semibold text-brand-primary-dark">
                Practice Problem {currentProblem + 1} of {practiceProblemsList.length}
              </h3>
              <button
                onClick={handleNextProblem}
                disabled={currentProblem === practiceProblemsList.length - 1}
                className={`px-4 py-2 rounded-lg ${currentProblem === practiceProblemsList.length - 1 ? 'bg-gray-300' : 'bg-brand-primary text-brand-text-light'}`}
              >
                Next
              </button>
            </div>

            <p className="text-brand-text-dark mb-4">{practiceProblemsList[currentProblem].question}</p>
            
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
                  if (parseInt(userAnswer) === practiceProblemsList[currentProblem].answer) {
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
                  {parseInt(userAnswer) === practiceProblemsList[currentProblem].answer 
                    ? "Correct! Great job!" 
                    : "Not quite. Let's solve this step by step:"}
                </p>
                {parseInt(userAnswer) !== practiceProblemsList[currentProblem].answer && (
                  <div className="mt-2 text-brand-text-dark">
                    {practiceProblemsList[currentProblem].solution.map((step, index) => (
                      <p key={index}>{step}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'practice' && (
        <div className="content-card max-w-4xl mx-auto">
          <div className="mt-8 p-6 bg-brand-background rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary-dark">Practice Problem</h3>
            <p className="text-brand-text-dark mb-4">{currentPracticeProblem.question}</p>
            
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
                  if (parseFloat(userAnswer) === currentPracticeProblem.answer) {
                    setScore(score + 1);
                  }
                }}
                className="px-6 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark"
              >
                Check Answer
              </button>
              <button
                onClick={() => {
                  setCurrentPracticeProblem(generateProblem(difficulty));
                  setShowAnswer(false);
                  setUserAnswer('');
                }}
                className="px-6 py-2 bg-brand-secondary text-brand-text-dark rounded-lg hover:bg-brand-primary hover:text-brand-text-light"
              >
                New Problem
              </button>
            </div>

            {showAnswer && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <p className="text-brand-primary-dark font-semibold">
                  {parseFloat(userAnswer) === currentPracticeProblem.answer 
                    ? "✅ Correct! Great job!" 
                    : "❌ Not quite. Let's solve this step by step:"}
                </p>
                {parseFloat(userAnswer) !== currentPracticeProblem.answer && (
                  <div className="mt-2 text-brand-text-dark">
                    {currentPracticeProblem.solution.map((step, index) => (
                      <p key={index} className="mb-2">{step}</p>
                    ))}
                    <p className="font-semibold mt-2">The correct answer is: {currentPracticeProblem.answer}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="content-card max-w-4xl mx-auto">
          {!showQuizResult ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-brand-primary-dark">
                Question {currentQuizQuestion + 1} of {quizQuestions.length}
              </h2>
              
              <p className="text-brand-text-dark mb-6">{quizQuestions[currentQuizQuestion].question}</p>
              
              <div className="space-y-4 mb-6">
                {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                      selectedAnswer === null
                        ? `bg-brand-surface text-brand-text-dark hover:shadow-md hover:bg-brand-surface hover:brightness-95 
                           transform hover:-translate-y-0.5`
                        : selectedAnswer === index
                          ? index === quizQuestions[currentQuizQuestion].correctAnswer
                            ? 'bg-green-100 text-green-800 border-2 border-green-500'
                            : 'bg-red-100 text-red-800 border-2 border-red-500'
                          : index === quizQuestions[currentQuizQuestion].correctAnswer
                            ? 'bg-green-100 text-green-800 border-2 border-green-500'
                            : 'bg-brand-surface text-brand-text-dark opacity-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark"
                >
                  {currentQuizQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6 text-brand-primary-dark">Quiz Results</h2>
              <p className="text-brand-text-dark text-xl mb-6">
                You scored {quizScore} out of {quizQuestions.length}!
              </p>
              <button
                onClick={startNewQuiz}
                className="px-6 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark"
              >
                Try New Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'flashcards' && (
        <div className="content-card max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center gap-4">
            <button
              onClick={() => setFlashcardMode('premade')}
              className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                flashcardMode === 'premade'
                  ? 'bg-brand-primary text-brand-text-light'
                  : 'bg-brand-surface text-brand-text-dark'
              }`}
            >
              Pre-made Cards
            </button>
            <button
              onClick={() => setFlashcardMode('custom')}
              className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                flashcardMode === 'custom'
                  ? 'bg-brand-primary text-brand-text-light'
                  : 'bg-brand-surface text-brand-text-dark'
              }`}
            >
              My Flashcards
            </button>
          </div>

          {flashcardMode === 'custom' && (
            <div className="mb-6">
              <button
                onClick={() => {
                  setShowAddCard(true);
                  setEditingCard(null);
                  setNewCardFront('');
                  setNewCardBack('');
                }}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Create New Flashcard
              </button>
            </div>
          )}

          {showAddCard && (
            <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-brand-primary-dark">
                {editingCard ? 'Edit Flashcard' : 'Create New Flashcard'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-text-dark mb-1">
                    Front Side
                  </label>
                  <textarea
                    value={newCardFront}
                    onChange={(e) => setNewCardFront(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-secondary rounded-lg focus:ring-2 focus:ring-brand-primary"
                    rows="3"
                    placeholder="Enter the question or concept"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-text-dark mb-1">
                    Back Side
                  </label>
                  <textarea
                    value={newCardBack}
                    onChange={(e) => setNewCardBack(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-secondary rounded-lg focus:ring-2 focus:ring-brand-primary"
                    rows="3"
                    placeholder="Enter the answer or explanation"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleAddCard}
                    className="px-6 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark"
                  >
                    {editingCard ? 'Save Changes' : 'Add Card'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddCard(false);
                      setEditingCard(null);
                    }}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeFlashcards.length > 0 ? (
            <>
              <div 
                className="bg-white p-8 rounded-lg shadow-lg cursor-pointer min-h-[300px] flex items-center justify-center text-center transition-all duration-300 transform hover:shadow-xl"
                onClick={() => setShowFlashcard(!showFlashcard)}
              >
                <div className="text-xl text-brand-text-dark">
                  {showFlashcard ? (
                    <pre className="whitespace-pre-line font-sans">
                      {activeFlashcards[currentFlashcard].back}
                    </pre>
                  ) : (
                    activeFlashcards[currentFlashcard].front
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => {
                    setCurrentFlashcard(prev => 
                      prev === 0 ? activeFlashcards.length - 1 : prev - 1
                    );
                    setShowFlashcard(false);
                  }}
                  className="px-6 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark"
                >
                  Previous
                </button>
                <span className="text-brand-text-dark">
                  Card {currentFlashcard + 1} of {activeFlashcards.length}
                </span>
                <button
                  onClick={() => {
                    setCurrentFlashcard(prev => 
                      prev === activeFlashcards.length - 1 ? 0 : prev + 1
                    );
                    setShowFlashcard(false);
                  }}
                  className="px-6 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark"
                >
                  Next
                </button>
              </div>

              {flashcardMode === 'custom' && (
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => handleEditCard(activeFlashcards[currentFlashcard])}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit Current Card
                  </button>
                  <button
                    onClick={() => handleDeleteCard(activeFlashcards[currentFlashcard].id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete Current Card
                  </button>
                </div>
              )}
            </>
          ) : flashcardMode === 'custom' ? (
            <div className="text-center text-brand-text-dark py-8">
              <p className="mb-4">You haven't created any flashcards yet!</p>
              <button
                onClick={() => setShowAddCard(true)}
                className="px-6 py-2 bg-brand-primary text-brand-text-light rounded-lg hover:bg-brand-primary-dark"
              >
                Create Your First Flashcard
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
