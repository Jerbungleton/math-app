// Utility functions to generate random math problems
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOperand(difficulty) {
  switch(difficulty) {
    case 'easy':
      return getRandomInt(1, 20);
    case 'medium':
      return getRandomInt(10, 50);
    case 'hard':
      return getRandomInt(20, 100);
    default:
      return getRandomInt(1, 20);
  }
}

function generateOperation(difficulty) {
  const operations = {
    easy: ['+', '-', '×'],
    medium: ['+', '-', '×', '÷'],
    hard: ['+', '-', '×', '÷']
  };
  
  const operationSet = operations[difficulty] || operations.easy;
  return operationSet[getRandomInt(0, operationSet.length - 1)];
}

function evaluateExpression(expression) {
  // Replace × and ÷ with * and / for JavaScript evaluation
  const jsExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
  return eval(jsExpression);
}

export function generateProblem(difficulty = 'easy') {
  let problem = '';
  let steps = [];
  let answer;
  
  if (difficulty === 'hard') {
    // Generate a problem with parentheses
    const num1 = generateOperand(difficulty);
    const num2 = generateOperand(difficulty);
    const num3 = generateOperand(difficulty);
    const op1 = generateOperation(difficulty);
    const op2 = generateOperation(difficulty);
    
    problem = `(${num1} ${op1} ${num2}) ${op2} ${num3}`;
    
    const intermediate = evaluateExpression(`${num1} ${op1} ${num2}`);
    steps = [
      `1. First, solve within parentheses: ${num1} ${op1} ${num2} = ${intermediate}`,
      `2. Then, ${intermediate} ${op2} ${num3} = ${evaluateExpression(problem)}`
    ];
  } else {
    // Generate a simple two-operation problem
    const num1 = generateOperand(difficulty);
    const num2 = generateOperand(difficulty);
    const num3 = generateOperand(difficulty);
    const op1 = generateOperation(difficulty);
    const op2 = generateOperation(difficulty);
    
    problem = `${num1} ${op1} ${num2} ${op2} ${num3}`;
    
    if ((op1 === '×' || op1 === '÷') && (op2 === '+' || op2 === '-')) {
      const intermediate = evaluateExpression(`${num1} ${op1} ${num2}`);
      steps = [
        `1. First, ${num1} ${op1} ${num2} = ${intermediate}`,
        `2. Then, ${intermediate} ${op2} ${num3} = ${evaluateExpression(problem)}`
      ];
    } else {
      const intermediate = evaluateExpression(`${num2} ${op2} ${num3}`);
      steps = [
        `1. First, ${num2} ${op2} ${num3} = ${intermediate}`,
        `2. Then, ${num1} ${op1} ${intermediate} = ${evaluateExpression(problem)}`
      ];
    }
  }
  
  answer = Math.round(evaluateExpression(problem) * 100) / 100; // Round to 2 decimal places
  
  return {
    question: `What is ${problem}?`,
    answer,
    solution: steps
  };
}

export function generateQuiz(numQuestions = 4, difficulty = 'medium') {
  const quiz = [];
  
  for (let i = 0; i < numQuestions; i++) {
    const problem = generateProblem(difficulty);
    const wrongAnswers = [
      Math.round((problem.answer + getRandomInt(1, 5)) * 100) / 100,
      Math.round((problem.answer - getRandomInt(1, 5)) * 100) / 100,
      Math.round((problem.answer * (1 + getRandomInt(1, 3) / 10)) * 100) / 100
    ];
    
    const options = [...wrongAnswers, problem.answer]
      .sort(() => Math.random() - 0.5);
    
    quiz.push({
      question: problem.question,
      options: options.map(String),
      correctAnswer: options.indexOf(problem.answer)
    });
  }
  
  return quiz;
}
