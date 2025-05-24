import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { generateProblem, generateQuiz } from '../../utils/mathProblemGenerator';
import { defaultFlashcards } from '../../utils/defaultFlashcards';
import MathInput from '../../components/layout/MathInput';
import ErrorBoundary from '../../components/layout/ErrorBoundary';
import {
  loadFlashcardSets,
  // saveFlashcardSets, // saveFlashcardSets is called by other flashcardManager functions
  createNewSet,
  deleteSet,
  addCardToSet,
  updateCardInSet,
  deleteCardFromSet,
  updateCardConfidence,
  getNextCard,
} from '../../utils/flashcardManager';
import '../../components/styles/Flashcard.css';

const INITIAL_PRACTICE_PROBLEM = { question: 'Loading problem...', answer: null, solution: [] };
const INITIAL_QUIZ_QUESTIONS = [{ question: 'Loading quiz...', options: [], correctAnswer: -1 }];

function BasicOperationsContent() {
  // General Page State
  const [activeTab, setActiveTab] = useState('getting-started');
  const [difficulty, setDifficulty] = useState('easy');
  
  // Practice Mode State
  const [currentProblem, setCurrentProblem] = useState(0);
  const [currentPracticeProblem, setCurrentPracticeProblem] = useState(null);
  const [showPracticeAnswer, setShowPracticeAnswer] = useState(false);
  const [userPracticeAnswer, setUserPracticeAnswer] = useState('');
  const [practiceHistory, setPracticeHistory] = useState([]);
  const [showPracticeResults, setShowPracticeResults] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Feedback for correct/incorrect answers
  const [isSuccess, setIsSuccess] = useState(false); // Track if feedback is for success or error

  // Quiz Mode State
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [userQuizAnswers, setUserQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizTime, setQuizTime] = useState(0);
  const [quizTimer, setQuizTimer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Flashcard State
  const [flashcardScreen, setFlashcardScreen] = useState('initialChoice'); // initialChoice, customOptions, reviewTypeChoice, studyView, viewCards //
  const [flashcardSource, setFlashcardSource] = useState(null); // 'premade', 'custom' //
  const [reviewType, setReviewType] = useState(null); // 'sequential', 'random', 'confidence' //
  const [studyView, setStudyView] = useState(false); // New state for study view //

  const [activeFlashcards, setActiveFlashcards] = useState([]);
  const [currentFlashcardDisplayIndex, setCurrentFlashcardDisplayIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);

  const [allFlashcardSets, setAllFlashcardSets] = useState({});
  const [currentCustomSet, setCurrentCustomSet] = useState('');
  
  const [showAddSetModal, setShowAddSetModal] = useState(false);
  const [newSetNameInput, setNewSetNameInput] = useState('');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardFrontInput, setNewCardFrontInput] = useState('');
  const [newCardBackInput, setNewCardBackInput] = useState('');
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  // New state variables for interactive practice
  const [userAnswer1, setUserAnswer1] = useState('');
  const [userAnswer2, setUserAnswer2] = useState('');
  const [userAnswer3, setUserAnswer3] = useState('');
  const [userAnswer4, setUserAnswer4] = useState('');
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showHint3, setShowHint3] = useState(false);
  const [showHint4, setShowHint4] = useState(false);
  const [showSolution1, setShowSolution1] = useState(false);
  const [showSolution2, setShowSolution2] = useState(false);
  const [showSolution3, setShowSolution3] = useState(false);
  const [showSolution4, setShowSolution4] = useState(false);

  // --- Utility Functions for State Reset ---
  const resetPracticeMode = useCallback(() => {
    setCurrentPracticeProblem(generateProblem(difficulty));
    setUserPracticeAnswer('');
    setShowPracticeAnswer(false);
    setShowHint(false);
    setShowSolution(false);
    setAttempts(0);
  }, [difficulty]);

  const resetQuizMode = useCallback(() => {
    setQuizQuestions([]);
    setCurrentQuizQuestion(0);
    setUserQuizAnswers({});
    setShowQuizResults(false);
    setQuizTime(0);
    setQuizStarted(false);
  }, []);

  const resetFlashcardMode = () => {
    setFlashcardScreen('initialChoice');
    setFlashcardSource(null);
    setReviewType(null);
    setActiveFlashcards([]);
    setCurrentFlashcardDisplayIndex(0);
    setIsCardFlipped(false);
    // Keep allFlashcardSets and currentCustomSet as they are, user might want to pick up where they left off with sets
    setShowAddSetModal(false);
    setShowAddCardModal(false);
    setEditingFlashcard(null);
  };

  // --- useEffect Hooks ---
  useEffect(() => {
    // Load sets on initial mount
    const loadedSets = loadFlashcardSets();
    if (Object.keys(loadedSets).length === 0) {
      // Ensure 'Default Set' exists if nothing is loaded or it's empty
      setAllFlashcardSets({ 'Default Set': [] });
      setCurrentCustomSet('Default Set');
    } else {
      setAllFlashcardSets(loadedSets);
      setCurrentCustomSet(Object.keys(loadedSets)[0] || 'Default Set');
    }
  }, []);
  
  useEffect(() => {
    if (activeTab === 'practice') resetPracticeMode();
    else if (activeTab === 'quiz') resetQuizMode();
    else if (activeTab === 'flashcards') resetFlashcardMode(); // Reset flashcards when tab is selected //
  }, [activeTab, resetPracticeMode, resetQuizMode]); // Removed resetFlashcardMode from here, handled by tab change //

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizTimer && quizTime > 0) {
      timer = setInterval(() => {
        setQuizTime(prev => prev - 1);
      }, 1000);
    } else if (quizTimer && quizTime === 0) {
      handleQuizComplete();
    }
    return () => clearInterval(timer);
  }, [quizTimer, quizTime]);

  // --- Event Handlers ---
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    // Specific resets for practice and quiz are handled by the useEffect above
    // Flashcard reset is also handled by the useEffect when flashcard tab is selected
  };
  // Practice Handlers
  const handlePracticeAnswer = () => {
    // Convert the answer to a number for comparison
    const numericAnswer = Number(userPracticeAnswer);
    const correctAnswer = currentPracticeProblem.answer;
    
    // Check if the answer is correct within a small margin of error for floating point comparisons
    const isCorrect = Math.abs(numericAnswer - correctAnswer) < 0.001;
    setAttempts(prev => prev + 1);
    
    if (isCorrect) {
      setPracticeHistory(prev => [...prev, {
        problem: currentPracticeProblem,
        userAnswer: numericAnswer,
        isCorrect,
        attempts: attempts + 1
      }]);
      setShowPracticeAnswer(true);
      setShowHint(false);
      setShowSolution(false);
      setIsSuccess(true);
      setFeedbackMessage('Correct! Great job! 🎉');
    } else {
      setIsSuccess(false);
      if (attempts === 0) {
        setFeedbackMessage('Not quite. Try again or ask for a hint! 💪');
      } else if (attempts === 1) {
        setFeedbackMessage('Still not correct. Would you like to see the solution?');
      }
    }
  };
  const handleNextPracticeProblem = () => {
    setCurrentPracticeProblem(generateProblem(difficulty));
    setShowPracticeAnswer(false);
    setUserPracticeAnswer('');
    setShowHint(false);
    setShowSolution(false);
    setAttempts(0);
    setFeedbackMessage(''); // Reset feedback message
    setIsSuccess(false); // Reset success state
  };

  const handlePracticeComplete = () => {
    setShowPracticeResults(true);
  };

  // Quiz Handlers
  const startQuiz = () => {
    const questions = Array.from({ length: 10 }, () => generateProblem(difficulty));
    setQuizQuestions(questions);
    setCurrentQuizQuestion(0);
    setUserQuizAnswers({});
    setShowQuizResults(false);
    setQuizTime(0);
    setQuizStarted(true);
    
    // Start timer
    const timer = setInterval(() => {
      setQuizTime(prev => prev + 1);
    }, 1000);
    setQuizTimer(timer);
  };

  const handleQuizAnswer = (answer) => {
    setUserQuizAnswers(prev => ({ //
      ...prev,
      [currentQuizQuestion]: answer //
    }));
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) { //
      setCurrentQuizQuestion(prev => prev + 1); //
    } else {
      handleQuizComplete(); //
    }
  };

  const handleQuizComplete = () => {
    clearInterval(quizTimer);
    setShowQuizResults(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Flashcard Handlers
  const handleFlashcardSourceSelect = (source) => {
    setFlashcardSource(source);
    if (source === 'premade') {
      setActiveFlashcards(defaultFlashcards);
      setFlashcardScreen('reviewTypeChoice');
    } else { // custom
      // Ensure currentCustomSet is valid
      if (!currentCustomSet || !allFlashcardSets[currentCustomSet]) {
          const setNames = Object.keys(allFlashcardSets);
          setCurrentCustomSet(setNames.length > 0 ? setNames[0] : 'Default Set');
      }
      setFlashcardScreen('customOptions');
    }
  };
  
  const handleCustomSetAction = (action) => {
      if (action === 'viewEditSet') {
          if (currentCustomSet && allFlashcardSets[currentCustomSet]) {
              setActiveFlashcards(allFlashcardSets[currentCustomSet]);
              setFlashcardScreen('reviewTypeChoice'); // Proceed to choose review type for this set //
          } else {
              alert("Please select a valid set or create one.");
          }
      } else if (action === 'createNewSetModal') {
          setShowAddSetModal(true);
      }
  };

  const handleReviewTypeSelect = (type) => {
    setReviewType(type);
    setCurrentFlashcardDisplayIndex(0);
    setIsCardFlipped(false);
    setStudyView(true); // Show study view first //
  };

  const startFlashcardReview = () => {
    setStudyView(false);
    setFlashcardScreen('viewCards');
  };

  const handleCreateNewSet = () => {
    if (newSetNameInput.trim()) {
      const updatedSets = createNewSet(allFlashcardSets, newSetNameInput.trim());
      setAllFlashcardSets(updatedSets);
      setCurrentCustomSet(newSetNameInput.trim());
      setActiveFlashcards(updatedSets[newSetNameInput.trim()] || []); // Load cards for the new set //
      setNewSetNameInput('');
      setShowAddSetModal(false);
      setFlashcardScreen('reviewTypeChoice'); // After creating a set, let user choose review type //
    }
  };
  
  const handleDeleteCustomSet = (setName) => {
    if (setName === 'Default Set' && Object.keys(allFlashcardSets).length <=1 ) {
        alert("Cannot delete the only set. Create another set first, or clear cards from this one.");
        return;
    }
     if (setName === 'Default Set') {
        alert("'Default Set' cannot be removed entirely, but you can remove its cards. To manage cards, select the set and then choose 'Add/Edit Cards in This Set'.");
        return;
    }
    const updatedSets = deleteSet(allFlashcardSets, setName);
    setAllFlashcardSets(updatedSets);
    if (currentCustomSet === setName) {
      const newCurrentSet = Object.keys(updatedSets)[0] || 'Default Set';
      setCurrentCustomSet(newCurrentSet);
      setActiveFlashcards(updatedSets[newCurrentSet] || []);
    }
    // If we were in a state that depended on this set, might need to go back
    if(flashcardScreen === 'reviewTypeChoice' || flashcardScreen === 'viewCards') {
        setFlashcardScreen('customOptions'); // Go back to set selection //
    }
  };

  const handleOpenAddCardModal = () => {
    setEditingFlashcard(null);
    setNewCardFrontInput('');
    setNewCardBackInput('');
    setShowAddCardModal(true);
  };

  const handleOpenEditCardModal = (card) => {
    setEditingFlashcard(card);
    setNewCardFrontInput(card.front);
    setNewCardBackInput(card.back);
    setShowAddCardModal(true);
  };

  const handleSaveCard = () => {
    if (newCardFrontInput.trim() && newCardBackInput.trim() && currentCustomSet) {
      let updatedSets;
      const cardData = { front: newCardFrontInput, back: newCardBackInput };
      if (editingFlashcard) {
        updatedSets = updateCardInSet(allFlashcardSets, currentCustomSet, editingFlashcard.id, cardData);
      } else {
        updatedSets = addCardToSet(allFlashcardSets, currentCustomSet, cardData);
      }
      setAllFlashcardSets(updatedSets);
      setActiveFlashcards(updatedSets[currentCustomSet] || []); // Refresh active cards //
      setShowAddCardModal(false);
      setEditingFlashcard(null);
    }
  };

  const handleDeleteCardFromSet = (cardId) => {
    if (currentCustomSet) {
      const updatedSets = deleteCardFromSet(allFlashcardSets, currentCustomSet, cardId);
      setAllFlashcardSets(updatedSets);
      const currentCards = updatedSets[currentCustomSet] || [];
      setActiveFlashcards(currentCards);
      if (currentFlashcardDisplayIndex >= currentCards.length && currentCards.length > 0) {
        setCurrentFlashcardDisplayIndex(currentCards.length - 1);
      } else if (currentCards.length === 0) {
        setCurrentFlashcardDisplayIndex(0);
        // Optionally, go back a screen if no cards left to review
        // setFlashcardScreen('reviewTypeChoice'); 
      }
    }
  };

  const handleNextFlashcard = () => {
    if (!activeFlashcards || activeFlashcards.length === 0) return;
    const nextIdx = getNextCard(activeFlashcards, reviewType, currentFlashcardDisplayIndex);
    setCurrentFlashcardDisplayIndex(nextIdx);
    setIsCardFlipped(false);
  };

  const handlePrevFlashcard = () => {
    if (!activeFlashcards || activeFlashcards.length === 0) return;
    const prevIdx = currentFlashcardDisplayIndex === 0 ? activeFlashcards.length - 1 : currentFlashcardDisplayIndex - 1;
    setCurrentFlashcardDisplayIndex(prevIdx);
    setIsCardFlipped(false);
  };
  
  const handleCardConfidence = (rating) => {
    if (flashcardSource === 'custom' && activeFlashcards[currentFlashcardDisplayIndex]?.id) {
      const cardId = activeFlashcards[currentFlashcardDisplayIndex].id;
      const updatedSets = updateCardConfidence(allFlashcardSets, currentCustomSet, cardId, rating);
      setAllFlashcardSets(updatedSets);
      setActiveFlashcards(updatedSets[currentCustomSet] || []);
    }
    // Potentially move to next card or re-evaluate for confidence mode
    handleNextFlashcard();
  };

  const currentDisplayedFlashcard = activeFlashcards[currentFlashcardDisplayIndex];

  // --- Render Logic ---
  const renderGettingStarted = () => (
    <div className="content-card max-w-4xl mx-auto text-brand-text-dark"> {/* */}
      <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Welcome to Basic Operations!</h2> {/* */}
      <p>This section is designed to help you practice and master fundamental arithmetic skills including addition, subtraction, multiplication, and division.</p> {/* */}
      <p className="mt-2">Use the tabs above to navigate:</p> {/* */}
      <ul className="list-disc list-inside ml-4 mt-2 space-y-1"> {/* */}
        <li><strong>Practice Mode:</strong> Work through problems one by one with solutions.</li> {/* */}
        <li><strong>Quiz:</strong> Test your knowledge with a series of questions.</li> {/* */}
        <li><strong>Flashcards:</strong> Review key concepts and quick problems.</li> {/* */}
          </ul>
    </div>
  );

  const renderPracticeMode = () => {
    if (!currentPracticeProblem) {
      return (
        <div className="max-w-2xl mx-auto space-y-6"> {/* */}
          <div className="bg-white rounded-lg shadow-md p-6"> {/* */}
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Practice Setup</h2> {/* */}
            
            {/* Difficulty Selection */}
            <div className="mb-6"> {/* */}
              <h3 className="text-lg font-semibold mb-2">Select Difficulty</h3> {/* */}
              <div className="flex gap-4"> {/* */}
                {['easy', 'medium', 'hard'].map(level => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)} //
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      difficulty === level
                        ? 'bg-brand-primary text-white' //
                        : 'bg-brand-surface text-brand-text-dark' //
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNextPracticeProblem} //
              className="w-full px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors" //
            >
              Start Practice
            </button>
          </div>
        </div>
      );

    }

    if (showPracticeResults) {
      const correctCount = practiceHistory.filter(p => p.isCorrect).length;
      const totalCount = practiceHistory.length;
      const percentage = Math.round((correctCount / totalCount) * 100);

      return (
        <div className="max-w-2xl mx-auto space-y-6"> {/* */}
          <div className="bg-white rounded-lg shadow-md p-6"> {/* */}
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Practice Results</h2> {/* */}
            
            <div className="mb-6"> {/* */}
              <p className="text-xl mb-2">Score: {correctCount} / {totalCount} ({percentage}%)</p> {/* */}
              
              {/* Performance Analysis */}
              <div className="mt-4"> {/* */}
                <h3 className="text-lg font-semibold mb-2">Performance Analysis</h3> {/* */}
                <div className="space-y-4"> {/* */}
                  {practiceHistory.map((item, index) => ( //
                    <div key={index} className={`p-4 rounded-lg ${item.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}> {/* */}
                      <p className="font-mono mb-2">{item.problem.question}</p> {/* */}
                      <p className="text-sm"> {/* */}
                        Your answer: {item.userAnswer}
                        {!item.isCorrect && ` (Correct answer: ${item.problem.answer})`} {/* */}
                      </p>
                      <p className="text-sm mt-1">Attempts: {item.attempts}</p> {/* */}
                      {!item.isCorrect && ( //
                        <div className="mt-2 text-sm"> {/* */}
                          <p className="font-semibold">Explanation:</p> {/* */}
                          <p>{item.problem.explanation}</p> {/* */}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4"> {/* */}
              <button
                onClick={() => {
                  setShowPracticeResults(false);
                  setPracticeHistory([]);
                  handleNextPracticeProblem();
                }}
                className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors" //
              >
                Practice Again
              </button>
              <button
                onClick={() => {
                  setShowPracticeResults(false);
                  setPracticeHistory([]);
                  setCurrentPracticeProblem(null);
                }}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors" //
              >
                Change Difficulty
              </button>
            </div>
          </div>
        </div>
      );

    }

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Practice Problem</h2>
          
          <div className="mb-6">
            <p className="text-xl mb-4">{currentPracticeProblem.question}</p>
            
            <div className="mb-4">              <ErrorBoundary>
                <MathInput
                  initialValue={userPracticeAnswer}
                  onChange={(value) => setUserPracticeAnswer(value)}
                  placeholder="Enter your answer"
                />
              </ErrorBoundary>
            </div>

            {feedbackMessage && !showPracticeAnswer && (
              <div className={`p-4 rounded-lg mb-4 ${isSuccess ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
                <p className="font-medium">{feedbackMessage}</p>
              </div>
            )}

            {!showPracticeAnswer ? (
              <div className="space-y-4">
                <button
                  onClick={handlePracticeAnswer}
                  className="w-full px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
                >
                  Check Answer
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                  >
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50">
                  <p className="font-semibold mb-2">Correct!</p>
                  <p>{currentPracticeProblem.explanation}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleNextPracticeProblem}
                    className="flex-1 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
                  >
                    Next Problem
                  </button>
                  <button
                    onClick={handlePracticeComplete}
                    className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    End Practice
                  </button>
                </div>
              </div>
            )}

            {showHint && ( //
              <div className="mt-4 p-4 rounded-lg bg-yellow-50">
                <p className="font-semibold mb-2">Hint:</p>
                <p>{currentPracticeProblem.hint}</p>
              </div>
            )}

            {showSolution && ( //
              <div className="mt-4 p-4 rounded-lg bg-green-50">
                <p className="font-semibold mb-2">Solution:</p>
                <p>{currentPracticeProblem.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderQuizSetup = () => (
    <div className="max-w-2xl mx-auto space-y-6"> {/* */}
      <div className="bg-white rounded-lg shadow-md p-6"> {/* */}
        <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Quiz Setup</h2> {/* */}
        
        {/* Difficulty Selection */}
        <div className="mb-6"> {/* */}
          <h3 className="text-lg font-semibold mb-2">Select Difficulty</h3> {/* */}
          <div className="flex gap-4"> {/* */}
            {['easy', 'medium', 'hard'].map(level => (
              <button
                key={level}
                onClick={() => setDifficulty(level)} //
                className={`px-4 py-2 rounded-lg transition-colors ${
                  difficulty === level
                    ? 'bg-brand-primary text-white' //
                    : 'bg-brand-surface text-brand-text-dark' //
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6"> {/* */}
          <h3 className="text-lg font-semibold mb-2">Quiz Information</h3> {/* */}
          <ul className="list-disc list-inside space-y-2 text-brand-text-dark"> {/* */}
            <li>10 questions</li> {/* */}
            <li>Time limit: 10 minutes</li> {/* */}
            <li>No skipping questions</li> {/* */}
            <li>Get explanations for wrong answers</li> {/* */}
          </ul>
        </div>

        <button
          onClick={startQuiz} //
          className="w-full px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors" //
        >
          Start Quiz
        </button>
      </div>
    </div>
  );

  const renderQuizMode = () => {
    if (!quizStarted) {
      return (
        <div className="max-w-2xl mx-auto space-y-6"> {/* */}
          <div className="bg-white rounded-lg shadow-md p-6"> {/* */}
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Quiz Setup</h2> {/* */}
            
            {/* Difficulty Selection */}
            <div className="mb-6"> {/* */}
              <h3 className="text-lg font-semibold mb-2">Select Difficulty</h3> {/* */}
              <div className="flex gap-4"> {/* */}
                {['easy', 'medium', 'hard'].map(level => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)} //
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      difficulty === level
                        ? 'bg-brand-primary text-white' //
                        : 'bg-brand-surface text-brand-text-dark' //
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6"> {/* */}
              <h3 className="text-lg font-semibold mb-2">Quiz Information</h3> {/* */}
              <ul className="list-disc list-inside space-y-2 text-brand-text-dark"> {/* */}
                <li>10 questions</li> {/* */}
                <li>Time limit: 10 minutes</li> {/* */}
                <li>No skipping questions</li> {/* */}
                <li>Get explanations for wrong answers</li> {/* */}
              </ul>
            </div>

            <button
              onClick={startQuiz} //
              className="w-full px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors" //
            >
              Start Quiz
            </button>
          </div>
        </div>
      );
    }

    if (showQuizResults) {
      const correctAnswers = Object.entries(userQuizAnswers).filter( //
        ([index, answer]) => answer === quizQuestions[parseInt(index)].answer //
      ).length;
      const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);

      return (
        <div className="max-w-2xl mx-auto space-y-6"> {/* */}
          <div className="bg-white rounded-lg shadow-md p-6"> {/* */}
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Quiz Results</h2> {/* */}
            
            <div className="mb-6"> {/* */}
              <div className="flex justify-between items-center mb-4"> {/* */}
                <p className="text-xl">Score: {correctAnswers} / {quizQuestions.length} ({percentage}%)</p> {/* */}
                <p className="text-lg">Time: {formatTime(quizTime)}</p> {/* */}
              </div>
              
              {/* Performance Analysis */}
              <div className="mt-4"> {/* */}
                <h3 className="text-lg font-semibold mb-2">Question Analysis</h3> {/* */}
                <div className="space-y-4"> {/* */}
                  {quizQuestions.map((question, index) => { //
                    const userAnswer = userQuizAnswers[index]; //
                    const isCorrect = userAnswer === question.answer; //
                    
                    return (
                      <div key={index} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}> {/* */}
                        <p className="font-mono mb-2">Question {index + 1}: {question.question}</p> {/* */}
                        <p className="text-sm"> {/* */}
                          Your answer: {userAnswer}
                          {!isCorrect && ` (Correct answer: ${question.answer})`} {/* */}
                        </p>
                        {!isCorrect && ( //
                          <div className="mt-2 text-sm"> {/* */}
                            <p className="font-semibold">Explanation:</p> {/* */}
                            <p>{question.explanation}</p> {/* */}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-4"> {/* */}
              <button
                onClick={() => {
                  setShowQuizResults(false);
                  setQuizStarted(false);
                }}
                className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors" //
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  setShowQuizResults(false);
                  setQuizStarted(false);
                }}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors" //
              >
                Change Difficulty
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (!quizQuestions.length) {
      return renderQuizSetup();
    }

    const currentQuestion = quizQuestions[currentQuizQuestion];
    const userAnswer = userQuizAnswers[currentQuizQuestion];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-brand-primary-dark">
              Question {currentQuizQuestion + 1} of {quizQuestions.length}
            </h2>
            <p className="text-lg">Time: {formatTime(quizTime)}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-xl mb-4">{currentQuestion.question}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {[currentQuestion.answer, ...generateDistractors(currentQuestion)].map((option, index) => ( //
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(option)}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    userAnswer === option
                      ? 'bg-brand-primary text-white' //
                      : 'bg-brand-surface text-brand-text-dark hover:bg-brand-surface-dark' //
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuizQuestion(prev => prev - 1)}
              disabled={currentQuizQuestion === 0}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuizQuestion}
              disabled={!userAnswer}
              className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors disabled:opacity-50"
            >
              {currentQuizQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const generateDistractors = (question) => {
    const distractors = new Set();
    while (distractors.size < 3) {
      const distractor = question.answer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5 + 1);
      if (distractor !== question.answer) {
        distractors.add(distractor);
      }
    }
    return Array.from(distractors);
  };

  const renderFlashcards = () => {
    // Step 1: Initial Choice (Source)
    if (flashcardScreen === 'initialChoice') {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-brand-primary-dark">Choose Flashcard Source</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => handleFlashcardSourceSelect('premade')} className="btn-primary px-8 py-3">Pre-made Cards</button>
            <button onClick={() => handleFlashcardSourceSelect('custom')} className="btn-primary px-8 py-3">My Flashcards</button>
          </div>
        </div>
      );
    }

    // Step 1.5: Custom Flashcard Options
    if (flashcardScreen === 'customOptions') {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-brand-primary-dark">My Flashcards</h2>
          <div className="mb-6">
            <label htmlFor="set-select" className="block text-sm font-medium text-brand-text-dark mb-1">Select Set:</label>
            <select
                id="set-select"
                value={currentCustomSet} //
                onChange={(e) => setCurrentCustomSet(e.target.value)} //
                className="px-4 py-2 border border-brand-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text-dark w-full max-w-xs mx-auto" //
            >
                {Object.keys(allFlashcardSets).length > 0 ? //
                    Object.keys(allFlashcardSets).map(name => <option key={name} value={name}>{name}</option>) : //
                    <option value="" disabled>No sets available</option> //
                }
            </select>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <button onClick={() => handleCustomSetAction('viewEditSet')} className="btn-primary" disabled={!currentCustomSet || !allFlashcardSets[currentCustomSet]}>Review This Set</button>
            <button onClick={() => handleOpenAddCardModal()} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg" disabled={!currentCustomSet}>Add Card to This Set</button>
          </div>
           <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => handleCustomSetAction('createNewSetModal')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Create New Set</button>
            {currentCustomSet && currentCustomSet !== 'Default Set' && ( //
                <button onClick={() => handleDeleteCustomSet(currentCustomSet)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete Current Set</button> //
            )}
          </div>
          <button onClick={() => setFlashcardScreen('initialChoice')} className="mt-8 block mx-auto text-sm text-brand-primary hover:text-brand-primary-dark">← Back to Source Choice</button>
        </div>
      );
    }

    // Study View
    if (studyView) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Study View</h2>
            <p className="text-brand-text-dark mb-6">Review all cards before starting the flashcard review. Click "Start Review" when you're ready.</p>
            
            <div className="space-y-4">
              {activeFlashcards.map((card, index) => (
                <div key={index} className="bg-brand-surface p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Front:</h3>
                      <p className="text-brand-text-dark">{card.front}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Back:</h3>
                      <p className="text-brand-text-dark">{card.back}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={startFlashcardReview}
                className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
              >
                Start Review
              </button>
              <button
                onClick={() => setStudyView(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Review Type
              </button>
            </div>
          </div>
        </div>
      );
    }

    // View Cards
    if (flashcardScreen === 'viewCards') {
      if (!activeFlashcards || activeFlashcards.length === 0) {
        return (
          <div className="text-center">
            <p className="text-brand-text-dark mb-4">No flashcards available in this set.</p>
            {flashcardSource === 'custom' && ( //
              <button onClick={handleOpenAddCardModal} className="btn-primary mb-4">Add Cards to "{currentCustomSet}"</button> //
            )}
            <button onClick={() => setFlashcardScreen('reviewTypeChoice')} className="mt-4 block mx-auto text-sm text-brand-primary hover:text-brand-primary-dark">← Back to Review Type</button>
          </div>
        );
      }
      return (
        <>
          <div className="flashcard-container">
            <div
              className={`flashcard ${isCardFlipped ? 'flipped' : ''}`}
              onClick={() => setIsCardFlipped(!isCardFlipped)}
            >
              <div className="flashcard-front">
                <div className="text-xl text-brand-text-dark p-4 text-center break-words">{currentDisplayedFlashcard?.front}</div>
              </div>
              <div className="flashcard-back">
                <div className="flex flex-col items-center gap-4">
                  <pre className="text-xl text-brand-text-dark whitespace-pre-line font-sans mb-4">
                    {currentDisplayedFlashcard?.back}
                  </pre>
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-brand-text-dark mb-2">How well did you know this?</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardConfidence(rating);
                          }}
                          className={`w-8 h-8 rounded-full ${
                            (currentDisplayedFlashcard?.confidence || 0) >= rating
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          } text-white hover:bg-green-600 transition-colors`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-brand-text-dark mt-2">
                      1 = Not at all, 5 = Perfectly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button onClick={handlePrevFlashcard} className="btn-primary">Previous</button>
            <span className="text-brand-text-dark">Card {currentFlashcardDisplayIndex + 1} of {activeFlashcards.length}</span>
            <button onClick={handleNextFlashcard} className="btn-primary">Next</button>
          </div>
          {flashcardSource === 'custom' && currentDisplayedFlashcard?.id && ( //
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={() => handleOpenEditCardModal(currentDisplayedFlashcard)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Edit</button>
              <button onClick={() => handleDeleteCardFromSet(currentDisplayedFlashcard.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
            </div>
          )}
          <button onClick={() => setFlashcardScreen('reviewTypeChoice')} className="mt-8 block mx-auto text-sm text-brand-primary hover:text-brand-primary-dark">← Back to Review Type Choice</button>
        </>
      );
    }
    return null;
  };
  
  // Modals
  const renderAddSetModal = () => (
    showAddSetModal && ( //
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"> {/* */}
            <div className="bg-brand-surface p-6 rounded-lg shadow-xl max-w-sm w-full"> {/* */}
                <h3 className="text-xl font-semibold mb-4 text-brand-primary-dark">Create New Set</h3> {/* */}
                <input
                    type="text"
                    value={newSetNameInput} //
                    onChange={(e) => setNewSetNameInput(e.target.value)} //
                    placeholder="Enter set name"
                    className="w-full px-3 py-2 mb-4 border border-brand-secondary rounded-lg focus:ring-2 focus:ring-brand-primary text-brand-text-dark" //
                />
                <div className="flex gap-2 justify-end"> {/* */}
                    <button onClick={handleCreateNewSet} className="btn-primary">Create</button> {/* */}
                    <button onClick={() => setShowAddSetModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button> {/* */}
                </div>
            </div>
        </div>
    )
  );

  const renderAddCardModal = () => (
    showAddCardModal && ( //
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"> {/* */}
            <div className="bg-brand-surface p-6 rounded-lg shadow-xl max-w-md w-full"> {/* */}
                <h3 className="text-xl font-semibold mb-4 text-brand-primary-dark"> {/* */}
                    {editingFlashcard ? 'Edit Flashcard' : `Add Card to "${currentCustomSet}"`} {/* */}
                </h3>
                <div className="space-y-4"> {/* */}
                    <div>
                        <label className="block text-sm font-medium text-brand-text-dark mb-1">Front</label> {/* */}
                        <textarea value={newCardFrontInput} onChange={(e) => setNewCardFrontInput(e.target.value)} className="w-full textarea" rows="3" /> {/* */}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-text-dark mb-1">Back</label> {/* */}
                        <textarea value={newCardBackInput} onChange={(e) => setNewCardBackInput(e.target.value)} className="w-full textarea" rows="3" /> {/* */}
                    </div>
                    <div className="flex gap-4 justify-end"> {/* */}
                        <button onClick={handleSaveCard} className="btn-primary">{editingFlashcard ? 'Save Changes' : 'Add Card'}</button> {/* */}
                        <button onClick={() => setShowAddCardModal(false)} className="btn-secondary">Cancel</button> {/* */}
                    </div>
                </div>
            </div>
        </div>
    )
  );

  // New function for checking answers in interactive practice
  const checkAnswer = (problemNumber, correctAnswer) => {
    const userAnswer = parseInt(eval(`userAnswer${problemNumber}`));
    if (userAnswer === correctAnswer) {
      alert('Correct! Great job! 🎉');
    } else {
      alert('Not quite. Try again or ask for a hint! 💪');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12"> {/* */}
      {renderAddSetModal()} {/* */}
      {renderAddCardModal()} {/* */}
      <div className="mb-8"> {/* */}
        <Link to="/pre-algebra" className="text-brand-primary hover:text-brand-primary-dark flex items-center gap-2"> {/* */}
          <span>←</span>
          <span>Back to Pre-Algebra Topics</span>
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-8 text-brand-primary-dark text-center animate-fade-in"> {/* */}
        Basic Operations
      </h1>

      <div className="mb-8"> {/* */}
        <div className="flex gap-4 justify-center mb-4"> {/* */}
          <button
            onClick={() => {
              setActiveTab('getting-started'); //
              setShowPracticeAnswer(false); //
              setUserPracticeAnswer(''); //
            }}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'getting-started'
                ? 'bg-brand-primary text-brand-text-light' //
                : 'bg-brand-surface text-brand-text-dark' //
            }`}
          >
            Getting Started
          </button>
          <button
            onClick={() => {
              setActiveTab('practice'); //
              setShowPracticeAnswer(false); //
              setUserPracticeAnswer(''); //
              setCurrentPracticeProblem(generateProblem(difficulty)); //
            }}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'practice'
                ? 'bg-brand-primary text-brand-text-light' //
                : 'bg-brand-surface text-brand-text-dark' //
            }`}
          >
            Practice Mode
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz'); //
              setShowQuizResults(false); //
              setCurrentQuizQuestion(0); //
              setQuizTime(0); //
              startQuiz(); //
            }}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'quiz'
                ? 'bg-brand-primary text-brand-text-light' //
                : 'bg-brand-surface text-brand-text-dark' //
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => {
              setActiveTab('flashcards'); //
              resetFlashcardMode(); //
            }}
            className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === 'flashcards'
                ? 'bg-brand-primary text-brand-text-light' //
                : 'bg-brand-surface text-brand-text-dark' //
            }`}
          >
            Flashcards
          </button>
        </div>
      </div>

      {activeTab === 'getting-started' && ( //
        <div className="max-w-4xl mx-auto space-y-8"> {/* */}
          <section className="bg-white rounded-lg shadow-md p-6"> {/* */}
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">What are Basic Operations?</h2> {/* */}
            <p className="text-brand-text-dark mb-4"> {/* */}
              Basic operations are the fundamental mathematical operations that form the foundation of arithmetic. 
              These operations are addition, subtraction, multiplication, and division. Understanding these operations 
              is crucial for solving more complex mathematical problems.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6"> {/* */}
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">The Four Basic Operations</h2> {/* */}
            
            <div className="space-y-6"> {/* */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-brand-primary">Addition (+)</h3> {/* */}
                <p className="text-brand-text-dark mb-2"> {/* */}
                  Addition combines two or more numbers to find their total or sum. It's like putting groups together.
                </p>
                <div className="bg-brand-surface p-4 rounded-lg"> {/* */}
                  <p className="font-mono">Example: 5 + 3 = 8</p> {/* */}
                  <p className="text-sm text-brand-text-dark mt-1">Five items plus three items equals eight items total.</p> {/* */}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-brand-primary">Subtraction (-)</h3> {/* */}
                <p className="text-brand-text-dark mb-2"> {/* */}
                  Subtraction finds the difference between two numbers by taking away one number from another.
                </p>
                <div className="bg-brand-surface p-4 rounded-lg"> {/* */}
                  <p className="font-mono">Example: 8 - 3 = 5</p> {/* */}
                  <p className="text-sm text-brand-text-dark mt-1">Eight items minus three items leaves five items.</p> {/* */}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-brand-primary">Multiplication (×)</h3> {/* */}
                <p className="text-brand-text-dark mb-2"> {/* */}
                  Multiplication is repeated addition. It combines equal groups to find a total.
                </p>
                <div className="bg-brand-surface p-4 rounded-lg"> {/* */}
                  <p className="font-mono">Example: 4 × 3 = 12</p> {/* */}
                  <p className="text-sm text-brand-text-dark mt-1">Four groups of three items equals twelve items total.</p> {/* */}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-brand-primary">Division (÷)</h3> {/* */}
                <p className="text-brand-text-dark mb-2"> {/* */}
                  Division splits a number into equal groups or parts. It's the opposite of multiplication.
                </p>
                <div className="bg-brand-surface p-4 rounded-lg"> {/* */}
                  <p className="font-mono">Example: 12 ÷ 3 = 4</p> {/* */}
                  <p className="text-sm text-brand-text-dark mt-1">Twelve items divided into groups of three equals four groups.</p> {/* */}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6"> {/* */}
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Try These Problems!</h2> {/* */}
            
            <div className="space-y-8"> {/* */}
              {/* Addition Problem */}
              <div className="bg-brand-surface p-6 rounded-lg"> {/* */}
                <h3 className="text-lg font-semibold mb-4">Problem 1: Addition</h3> {/* */}
                <p className="font-mono text-xl mb-4">9 + 7 = ?</p> {/* */}
                <div className="space-y-4"> {/* */}
                  <div className="flex gap-4"> {/* */}                    <ErrorBoundary>
                      <MathInput
                        initialValue={userAnswer1}
                        onChange={(value) => setUserAnswer1(value)}
                        placeholder="Your answer"
                      />
                    </ErrorBoundary>
                    <button
                      onClick={() => checkAnswer(1, 16)} //
                      className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark" //
                    >
                      Check Answer
                    </button>
                  </div>
                  {showHint1 && ( //
                    <div className="p-4 bg-yellow-50 rounded-lg"> {/* */}
                      <p className="font-semibold mb-2">Hint:</p> {/* */}
                      <p>Try breaking it down: 9 + 7 = (9 + 1) + 6 = 10 + 6</p> {/* */}
                    </div>
                  )}
                  {showSolution1 && ( //
                    <div className="p-4 bg-green-50 rounded-lg"> {/* */}
                      <p className="font-semibold mb-2">Solution:</p> {/* */}
                      <p>1. Start with 9</p> {/* */}
                      <p>2. Add 7 by breaking it into 1 + 6</p> {/* */}
                      <p>3. First add 1 to 9 to get 10</p> {/* */}
                      <p>4. Then add the remaining 6 to get 16</p> {/* */}
                      <p className="font-semibold mt-2">Answer: 16</p> {/* */}
                    </div>
                  )}
                  <div className="flex gap-4"> {/* */}                    <button                      onClick={() => setShowHint1(!showHint1)}
                      className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                    >
                      {showHint1 ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <button
                      onClick={() => setShowSolution1(!showSolution1)}
                      className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                    >
                      {showSolution1 ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtraction Problem */}
              <div className="bg-brand-surface p-6 rounded-lg"> {/* */}
                <h3 className="text-lg font-semibold mb-4">Problem 2: Subtraction</h3> {/* */}
                <p className="font-mono text-xl mb-4">13 - 6 = ?</p> {/* */}
                <div className="space-y-4"> {/* */}
                  <div className="flex gap-4"> {/* */}                    <ErrorBoundary>
                      <MathInput
                        initialValue={userAnswer2}
                        onChange={(value) => setUserAnswer2(value)}
                        placeholder="Your answer"
                      />
                    </ErrorBoundary>
                    <button
                      onClick={() => checkAnswer(2, 7)} //
                      className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark" //
                    >
                      Check Answer
                    </button>
                  </div>
                  {showHint2 && ( //
                    <div className="p-4 bg-yellow-50 rounded-lg"> {/* */}
                      <p className="font-semibold mb-2">Hint:</p> {/* */}
                      <p>Think about how many you need to add to 6 to get to 13</p> {/* */}
                    </div>
                  )}
                  {showSolution2 && ( //
                    <div className="p-4 bg-green-50 rounded-lg"> {/* */}
                      <p className="font-semibold mb-2">Solution:</p> {/* */}
                      <p>1. Start with 13</p> {/* */}
                      <p>2. Break down 6 into 3 + 3</p> {/* */}
                      <p>3. First subtract 3 from 13 to get 10</p> {/* */}
                      <p>4. Then subtract the remaining 3 to get 7</p> {/* */}
                      <p className="font-semibold mt-2">Answer: 7</p> {/* */}
                    </div>
                  )}
                  <div className="flex gap-4"> {/* */}                    <button                      onClick={() => setShowHint2(!showHint2)}
                      className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                    >
                      {showHint2 ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <button
                      onClick={() => setShowSolution2(!showSolution2)}
                      className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                    >
                      {showSolution2 ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Multiplication Problem */}
              <div className="bg-brand-surface p-6 rounded-lg"> {/* */}
                <h3 className="text-lg font-semibold mb-4">Problem 3: Multiplication</h3> {/* */}
                <p className="font-mono text-xl mb-4">5 × 3 = ?</p> {/* */}
                <div className="space-y-4"> {/* */}
                  <div className="flex gap-4"> {/* */}                    <ErrorBoundary>
                      <MathInput
                        initialValue={userAnswer3}
                        onChange={(value) => setUserAnswer3(value)}
                        placeholder="Your answer"
                      />
                    </ErrorBoundary>
                    <button
                      onClick={() => checkAnswer(3, 15)} //
                      className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark" //
                    >
                      Check Answer
                    </button>
                  </div>
                  {showHint3 && ( //
                    <div className="p-4 bg-yellow-50 rounded-lg"> {/* */}
                      <p className="font-semibold mb-2">Hint:</p> {/* */}
                      <p>Remember, multiplication is repeated addition: 5 × 3 = 5 + 5 + 5</p> {/* */}
                    </div>
                  )}
                  {showSolution3 && ( //
                    <div className="p-4 bg-green-50 rounded-lg"> {/* */}
                      <p className="font-semibold mb-2">Solution:</p> {/* */}
                      <p>1. Think of 5 × 3 as 5 groups of 3</p> {/* */}
                      <p>2. Add 5 three times: 5 + 5 + 5</p> {/* */}
                      <p>3. Or count by 5s: 5, 10, 15</p> {/* */}
                      <p className="font-semibold mt-2">Answer: 15</p> {/* */}
                    </div>
                  )}
                  <div className="flex gap-4"> {/* */}                    <button                      onClick={() => setShowHint3(!showHint3)}
                      className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                    >
                      {showHint3 ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <button
                      onClick={() => setShowSolution3(!showSolution3)}
                      className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                    >
                      {showSolution3 ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Division Problem */}
              <div className="bg-brand-surface p-6 rounded-lg"> {/* */}
                <h3 className="text-lg font-semibold mb-4">Problem 4: Division</h3> {/* */}
                <p className="font-mono text-xl mb-4">18 ÷ 3 = ?</p> {/* */}
                <div className="space-y-4"> {/* */}
                  <div className="flex gap-4"> {/* */}                    <ErrorBoundary>
                      <MathInput
                        initialValue={userAnswer4}
                        onChange={(value) => setUserAnswer4(value)}
                        placeholder="Your answer"
                      />
                    </ErrorBoundary>
                    <button
                      onClick={() => checkAnswer(4, 6)} //
                      className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark" //
                    >
                      Check Answer
                    </button>
                  </div>
                  {showHint4 && ( //
                    <div className="p-4 bg-yellow-50 rounded-lg"> {/* */}
                      <p className="font-semibold mb-2">Hint:</p> {/* */}
                      <p>Think about how many groups of 3 make up 18</p> {/* */}
                    </div>
                  )}
                  {showSolution4 && ( //
                    <div className="p-4 bg-green-50 rounded-lg"> {/* */}
                      <p className="font-semibold mb-2">Solution:</p> {/* */}
                      <p>1. Start with 18 items</p> {/* */}
                      <p>2. Divide them into groups of 3</p> {/* */}
                      <p>3. Count the groups: 3, 6, 9, 12, 15, 18</p> {/* */}
                      <p>4. You made 6 groups</p> {/* */}
                      <p className="font-semibold mt-2">Answer: 6</p> {/* */}
                    </div>
                  )}
                  <div className="flex gap-4"> {/* */}                    <button                      onClick={() => setShowHint4(!showHint4)}
                      className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                    >
                      {showHint4 ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <button
                      onClick={() => setShowSolution4(!showSolution4)}
                      className="w-full sm:w-auto px-4 py-2 font-medium text-brand-primary bg-white border border-brand-primary rounded-lg hover:bg-brand-surface transition-colors"
                    >
                      {showSolution4 ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6"> {/* */}
            <h2 className="text-2xl font-semibold mb-4 text-brand-primary-dark">Tips for Success</h2> {/* */}
            <ul className="list-disc list-inside space-y-2 text-brand-text-dark"> {/* */}
              <li>Practice regularly with different types of problems</li> {/* */}
              <li>Use visual aids like number lines or counters when learning</li> {/* */}
              <li>Memorize basic facts for quick calculations</li> {/* */}
              <li>Check your work by using the opposite operation</li> {/* */}
              <li>Break down complex problems into smaller steps</li> {/* */}
            </ul>
          </section>
        </div>
      )}
      {activeTab === 'practice' && renderPracticeMode()} {/* */}
      {activeTab === 'quiz' && renderQuizMode()} {/* */}
      {activeTab === 'flashcards' && ( //
        <div className="content-card max-w-4xl mx-auto"> {/* */}
            {renderFlashcards()} {/* */}
        </div>
      )}
    </div>
  );
}

function BasicOperationsPage() {
  return (
    <ErrorBoundary>
      <BasicOperationsContent />
    </ErrorBoundary>
  );
}

export default BasicOperationsPage;

