// Utility functions for managing flashcard sets
const STORAGE_KEY = 'mathFlashcardSets';

export const loadFlashcardSets = () => {
  const savedSets = localStorage.getItem(STORAGE_KEY);
  if (savedSets) {
    return JSON.parse(savedSets);
  }
  return {};
};

export const saveFlashcardSets = (sets) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
};

export const createNewSet = (sets, setName, initialCards = []) => {
  const newSets = {
    ...sets,
    [setName]: initialCards
  };
  saveFlashcardSets(newSets);
  return newSets;
};

export const deleteSet = (sets, setName) => {
  const newSets = { ...sets };
  delete newSets[setName];
  saveFlashcardSets(newSets);
  return newSets;
};

export const addCardToSet = (sets, setName, card) => {
  const newCard = {
    ...card,
    id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    confidence: 0, // 0-5 rating where 0 is unknown and 5 is mastered
    lastReviewed: null,
  };
  const newSets = {
    ...sets,
    [setName]: [...(sets[setName] || []), newCard]
  };
  saveFlashcardSets(newSets);
  return newSets;
};

export const updateCardConfidence = (sets, setName, cardId, confidence) => {
  const newSets = {
    ...sets,
    [setName]: sets[setName].map(card => 
      card.id === cardId 
        ? { 
            ...card, 
            confidence,
            lastReviewed: Date.now()
          } 
        : card
    )
  };
  saveFlashcardSets(newSets);
  return newSets;
};

export const getNextCard = (cards, mode = 'sequential', currentIndex = 0) => {
  if (!cards || !Array.isArray(cards) || cards.length === 0) return 0;
  
  // Ensure currentIndex is within bounds
  currentIndex = Math.max(0, Math.min(currentIndex, cards.length - 1));
  
  switch (mode) {
    case 'random':
      return Math.floor(Math.random() * cards.length);
      
    case 'confidence':
      // Weight cards by inverse confidence (less confident = more likely)
      const totalWeight = cards.reduce((sum, card) => sum + (5 - (card.confidence || 0)), 0);
      if (totalWeight === 0) return Math.floor(Math.random() * cards.length);
      
      let random = Math.random() * totalWeight;
      for (let i = 0; i < cards.length; i++) {
        const weight = 5 - (cards[i].confidence || 0);
        if (random <= weight) return i;
        random -= weight;
      }
      return 0;
      
    default: // sequential
      return currentIndex >= cards.length - 1 ? 0 : currentIndex + 1;
  }
};

export const updateCardInSet = (sets, setName, cardId, updatedCard) => {
  const newSets = {
    ...sets,
    [setName]: sets[setName].map(card => 
      card.id === cardId ? { ...card, ...updatedCard } : card
    )
  };
  saveFlashcardSets(newSets);
  return newSets;
};

export const deleteCardFromSet = (sets, setName, cardId) => {
  if (!sets[setName]) return sets;
  
  const newSets = {
    ...sets,
    [setName]: sets[setName].filter(card => card.id !== cardId)
  };
  saveFlashcardSets(newSets);
  return newSets;
};
