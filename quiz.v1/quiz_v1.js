// 题库（学前儿童数学）
const questions = [
    {
        question: "2 + 2 = ?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "5 - 1 = ?",
        options: ["3", "4", "6", "2"],
        answer: 1
    },
    {
        question: "3 + 3 = ?",
        options: ["5", "7", "6", "8"],
        answer: 2
    },
    {
        question: "10 - 4 = ?",
        options: ["5", "7", "4", "6"],
        answer: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;
let usedQuestions = [];

// 开始
startQuiz();

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    usedQuestions = [];
    nextQuestion();
}

function nextQuestion() {
    // 防止重复出题
    let available = questions.filter((_, i) => !usedQuestions.includes(i));
    if (available.length === 0) {
        document.getElementById("question").innerText = "Quiz finished! Score: " + score;
        document.getElementById("options").innerHTML = "";
        document.getElementById("nextBtn").disabled = true;
        return;
    }

    // 随机选一题
    let randomIndex = Math.floor(Math.random() * available.length);
    let q = available[randomIndex];
    let qIndex = questions.indexOf(q);
    usedQuestions.push(qIndex);

    // 显示题目
    document.getElementById("question").innerText = q.question;
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    // 显示选项
    q.options.forEach((option, i) => {
        let btn = document.createElement("button");
        btn.className = "option";
        btn.innerText = option;
        btn.onclick = () => checkAnswer(btn, i, q.answer);
        optionsDiv.appendChild(btn);
    });

    // 重置
    document.getElementById("feedback").innerText = "";
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("score").innerText = "Score: " + score;
}

// 检查答案 + 互动反馈
function checkAnswer(btn, selected, correct) {
    let allOptions = document.querySelectorAll(".option");
    allOptions.forEach(opt => opt.disabled = true);

    if (selected === correct) {
        btn.classList.add("correct");
        document.getElementById("feedback").innerText = "✅ Correct!";
        document.getElementById("feedback").style.color = "green";
        score++;
    } else {
        btn.classList.add("wrong");
        allOptions[correct].classList.add("correct");
        document.getElementById("feedback").innerText = "❌ Try again";
        document.getElementById("feedback").style.color = "red";
    }

    document.getElementById("nextBtn").disabled = false;
}