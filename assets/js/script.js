const quizData = [
  {question: "Welcome",
  answers: [
    "Start"],
  correctAnswer: 0
},
{question: "Is this Fun?",
answers: [
  "Very Fun",
  "Not Fun",],
correctAnswer: 0
},
{question: "Is JavaScript Cool?",
answers: [
  "No"],
correctAnswer: 0
},
{question: "That does CSS stand for",
answers: [
  "Code Strict Systems",
  "Cascade Super Strength",
  "Cascading Style Sheets",
  "Container Securtiy Systems",],
correctAnswer: 2
},
{question: "What does API stand for?",
answers: [
  "Application Programming Interface",
  "Attention Programming Intergration",
  "Applicable Paramater Intigration",
  "Animal Petting Institute"],
correctAnswer: 0
},
{question: "I ran out of time, sorry",
answers: [
  "Make more time for the next challenge",
  "Drink more coffee",
  "Try harder",
  "Copy, Paste"],
correctAnswer: 0
},
{question: "Question 6",
answers: [
  "Answer 1",
  "Answer 2",
  "Answer 3",
  "Correct Answer"],
correctAnswer: 3
},
{question: "Question 7",
answers: [
  "Answer 1",
  "Answer 2",
  "Correct Answer",
  "Answer 4"],
correctAnswer: 2
},
{question: "Question 8",
answers: [
  "Answer 1",
  "Correct Answer",
  "Answer 3",
  "Answer 4"],
correctAnswer: 1
},
{question: "Question 9",
answers: [
  "Correct Answer",
  "Answer 2",
  "Answer 3",
  "Answer 4"],
correctAnswer: 0
},
{question: "Your guess is as good as mine",
answers: [
  "Answer 1",
  "Answer 2",
  "Answer 3",
  "Answer 4"],
correctAnswer: 2
},]
       
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices-container");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let answerSubmitted = false;
let timerRunning = false;

function initializeQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  answerSubmitted = false;
  showQuestion();
}

function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choicesElement.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("choice");
    button.textContent = answer;
    button.dataset.answerIndex = index;
    button.addEventListener("click", handleChoiceClick);
    choicesElement.appendChild(button);
  });
}

function handleChoiceClick(event) {
  if (answerSubmitted) {
    return; // Prevent multiple clicks before moving to the next question
  }

  answerSubmitted = true; // Mark answer as submitted
  const selectedChoiceIndex = event.target.dataset.answerIndex;
  const currentQuestion = quizData[currentQuestionIndex];

  if (selectedChoiceIndex == currentQuestion.correctAnswer) {
    score += 10; // Increase score by 10 for correct answer
    event.target.classList.add("correct");
  } else {
    event.target.classList.add("incorrect");
    timeLeft -= 5; // Decrement timer by 5 seconds for incorrect answer
  }

  setTimeout(() => {
    answerSubmitted = false; // Reset answerSubmitted after 2 seconds
    event.target.classList.remove("correct", "incorrect");

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
      showQuestion();
      if (currentQuestionIndex === 1) {
        startQuizTimer(); // Start the timer after the first question is answered
      }
    } else {
      showResult();
    }
  }, 2000);

  scoreElement.textContent = `Score: ${score}`; // Update score display
}


function startQuizTimer() {
  if (!timerRunning) {
    timerRunning = true;
    timer = setInterval(function() {
      timeLeft--;
      timerElement.textContent = formatTime(timeLeft);

      if (timeLeft === 0) {
        clearInterval(timer);
        showResult();
      }
    }, 1000);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function showResult() {
  clearInterval(timer);
  choicesElement.innerHTML = "";

  const playerName = prompt("Enter your name:");

  if (score > 0) {
    highScores.push({ name: playerName, score: score });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);

    const highScoresElement = document.getElementById("high-scores");
    let scoreList = "<h2>Top Ten High Scores</h2>";
    scoreList += "<ol>";

    for (let i = 0; i < highScores.length; i++) {
      scoreList += `<li>${i + 1}. ${highScores[i].name}: ${highScores[i].score}</li>`;
    }

    scoreList += "</ol>";
    highScoresElement.innerHTML = scoreList;
    highScoresElement.style.display = "block";

    // Save high scores to local storage
    const highScoresJson = JSON.stringify(highScores);
    localStorage.setItem("highScores", highScoresJson);
  }

  // Hide elements
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("score-box").style.display = "none";
  document.getElementById("timer-box").style.display = "none";
}

// Retrieve high scores from local storage
function loadHighScores() {
  const highScoresJson = localStorage.getItem("highScores");
  highScores = JSON.parse(highScoresJson) || [];
}


function initializeQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  answerSubmitted = false;
  showQuestion();
}

function startTimer() {
  timer = setInterval(function() {
    timeLeft--;
    timerElement.textContent = formatTime(timeLeft);

    if (timeLeft === 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

initializeQuiz();
loadHighScores();