const questions = [
    {
      question: "Which function of an Array object calls a function for each element in the array?",
      answers: [
        { text: "forEach()", correct: true },
        { text: "for()", correct: false },
        { text: "forEvery()", correct: false },
        { text: "Each()", correct: false },
      ],
    },
    {
      question: "OnClick event is used to handle?",
      answers: [
        { text: "Handle window size", correct: false },
        { text: "Handle change events", correct: false },
        { text: "None of the above", correct: false },
        {
          text: "Handle click events",
          correct: true,
        },
      ],
    },
    {
      question: "How do you create a Promise in JavaScript?",
      answers: [
        { text: "Promise.create()", correct: false },
        { text: "Promise()", correct: false },
        { text: "new Promise()", correct: true },
        { text: "createPromise()", correct: false },
      ],
    },
    {
      question: "How do you create a function in JavaScript?",
      answers: [
        { text: "function = myFunction()", correct: false },
        { text: "function : myFunction()", correct: false },
        { text: "function / myFunction()", correct: false },
        { text: "function myFunction()", correct: true },
      ],
    },
    {
      question: "Is JavaScript case-sensitive?",
      answers: [
        { text: "No", correct: false },
        { text: "Yes", correct: true },
        { text: "Both", correct: false },
        { text: "None of the above", correct: false },
      ],
    },
    {
      question: "Which loop will always execute at least once, even if the condition is false?",
      answers: [
        { text: "for loop", correct: false },
        { text: "while loop", correct: false },
        { text: "do...while loop", correct: true },
        { text: "None of the above", correct: false },
      ],
    },
    {
        
    question: "What method is used to round a number to the nearest integer in JavaScript?",
    answers: [
      { text: "Math.round()", correct: true },
      { text: "Math.floor()", correct: false },
      { text: "Math.ceil()", correct: false},
      { text: "Number.round()", correct: false },
     
    ],
  },

  {
    question: "How does a WHILE loop start?",
    answers: [
      { text: "while( i<= 10; i++)", correct: false },
      { text: "while(i<=10)", correct: true},
      { text: "while i=1 to 10", correct: false},
      { text: "while 1=0", correct: false },
     
    ],
  },

  {
    question: "Which operator is used to assign a value to a variable in JavaScript?",
    answers: [
      { text: "-", correct: false },
      { text: "+", correct: false},
      { text: "*", correct: false},
      { text: "=", correct: true },
     
    ],
  },

  {
    question: "Which statement is used to handle exceptions in JavaScript?",
    answers: [
      { text: "try-catch", correct: true},
      { text: "catch", correct: false},
      { text: "try", correct: false},
      { text: "error", correct: false},
     
    ],
  },

  ];

  

  const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time-left");
const clockIcon = document.getElementById("clock-icon");

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
const timeLimit = 15;
let timeLeft;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  clearInterval(timerInterval);
  timerElement.innerHTML = `${timeLimit}s`;
  clockIcon.style.display = "inline-block";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function startTimer() {
  timeLeft = timeLimit;
  timerElement.innerHTML = `${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      moveToNextQuestion();p
    }
  }, 1000);
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    moveToNextQuestion();
  } else {
    startQuiz();
  }
});

startQuiz();