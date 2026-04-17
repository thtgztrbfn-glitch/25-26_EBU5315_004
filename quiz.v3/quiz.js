// Quiz Data - 可自由修改题目
const quizData = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property controls text size?",
        answers: [
            "font-style",
            "text-size",
            "font-size",
            "text-style"
        ],
        correct: 2
    },
    {
        question: "Which is a JavaScript data type?",
        answers: [
            "Float",
            "String",
            "Decimal",
            "All of the above"
        ],
        correct: 1
    },
    {
        question: "Which HTML tag defines an unordered list?",
        answers: [
            "<ul>",
            "<ol>",
            "<li>",
            "<list>"
        ],
        correct: 0
    },
    {
        question: "How to write a comment in CSS?",
        answers: [
            "// comment",
            "/* comment */",
            "<!-- comment -->",
            "# comment"
        ],
        correct: 1
    }
];

// DOM Elements
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('final-score');
const finalTotalEl = document.getElementById('final-total');
const performanceTextEl = document.getElementById('performance-text');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const progressFillEl = document.getElementById('progress-fill');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Initialize Quiz
initQuiz();

function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    resultEl.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
    totalQuestionsEl.textContent = quizData.length;
    loadQuestion();
}

// Load Current Question
function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Update progress
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressFillEl.style.width = `${progress}%`;
    
    // Load question
    questionEl.textContent = currentQuestion.question;
    
    // Load answers
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer;
        button.dataset.index = index;
        
        button.addEventListener('click', () => selectAnswer(index));
        answersEl.appendChild(button);
    });
    
    nextBtn.disabled = true;
}

// Reset UI State
function resetState() {
    selectedAnswer = null;
    answersEl.innerHTML = '';
}

// Select Answer
function selectAnswer(index) {
    // Remove previous selection
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Mark selected
    selectedAnswer = index;
    document.querySelector(`.answer-btn[data-index="${index}"]`).classList.add('selected');
    nextBtn.disabled = false;
}

// Show Answer Result
function showAnswerResult() {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    
    buttons.forEach((btn, index) => {
        if (index === currentQuestion.correct) {
            btn.classList.add('correct');
        } else if (index === selectedAnswer && index !== currentQuestion.correct) {
            btn.classList.add('incorrect');
        }
        btn.disabled = true;
    });
    
    // Update score
    if (selectedAnswer === currentQuestion.correct) {
        score++;
        scoreEl.textContent = score;
    }
}

// Next Question
nextBtn.addEventListener('click', () => {
    showAnswerResult();
    
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000);
});

// Show Final Result
function showResult() {
    resultEl.style.display = 'block';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    finalScoreEl.textContent = score;
    finalTotalEl.textContent = quizData.length;
    
    // Performance text
    const percentage = (score / quizData.length) * 100;
    let performance = '';
    
    if (percentage === 100) {
        performance = 'Perfect! Excellent job!';
    } else if (percentage >= 80) {
        performance = 'Great work! Well done!';
    } else if (percentage >= 60) {
        performance = 'Good effort! Keep practicing!';
    } else {
        performance = 'Nice try! Study more and try again!';
    }
    
    performanceTextEl.textContent = performance;
}

// Restart Quiz
restartBtn.addEventListener('click', initQuiz);