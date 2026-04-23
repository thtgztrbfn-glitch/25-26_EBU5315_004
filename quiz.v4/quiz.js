// 三关题库（难度分级）
const quizData = {
    level1: [
        { q: "The angle at the center is ____ the angle at the circumference.", o: ["double", "half", "equal"], a: "double" },
        { q: "Angles in the same segment are ____.", o: ["equal", "different", "right"], a: "equal" },
        { q: "Angle in a semicircle is ____ degrees.", o: ["90", "180", "360"], a: "90" },
        { q: "Opposite angles in a cyclic quadrilateral add to ____.", o: ["180°", "90°", "360°"], a: "180°" },
        { q: "A tangent is ____ to the radius.", o: ["perpendicular", "parallel", "equal"], a: "perpendicular" }
    ],
    level2: [
        { q: "If angle at circumference is 40°, angle at center is?", o: ["80°", "40°", "20°"], a: "80°" },
        { q: "Two tangents from a point to a circle are ____.", o: ["equal", "different", "parallel"], a: "equal" },
        { q: "Angle between tangent and chord = angle in the ____ segment.", o: ["alternate", "same", "major"], a: "alternate" },
        { q: "A cyclic quadrilateral has all vertices on the ____.", o: ["circle", "square", "line"], a: "circle" },
        { q: "If one angle in cyclic quadrilateral is 70°, opposite is?", o: ["110°", "70°", "90°"], a: "110°" }
    ],
    level3: [
        { q: "Calculate the angle at center if circumference angle is 35°.", o: ["70°", "35°", "17.5°"], a: "70°" },
        { q: "Which angle proves a triangle is right-angled in a semicircle?", o: ["90°", "180°", "60°"], a: "90°" },
        { q: "Tangent + radius = ____ angle.", o: ["90°", "180°", "45°"], a: "90°" },
        { q: "In cyclic quadrilateral: 100° + ? = 180°", o: ["80°", "100°", "90°"], a: "80°" },
        { q: "Equal chords subtend ____ angles at center.", o: ["equal", "different", "right"], a: "equal" }
    ]
};

// 定义各题要选中的选项（a/c/b/a/c 对应第1-5题）
const targetSelectedOptions = ['a', 'c', 'b', 'a', 'c'];

let currentLevel = "level1";
let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let selectedAnswer = null;

// DOM 元素
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const restartBtn = document.getElementById('restart-btn');
const feedbackScore = document.getElementById('feedback-score');
const feedbackCorrect = document.getElementById('feedback-correct');
const feedbackWrong = document.getElementById('feedback-wrong');
const feedbackStatus = document.getElementById('feedback-status');

// 从URL参数获取关卡
function getLevelFromURL() {
    const params = new URLSearchParams(window.location.search);
    const level = params.get('level');
    if (level && quizData[level]) {
        currentLevel = level;
    }
}

// 随机打乱数组（Fisher-Yates 洗牌算法）
function shuffleArray(array) {
    const newArray = [...array]; // 深拷贝原数组，避免修改原题库
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 初始化题目
function loadQuestion() {
    const questions = quizData[currentLevel];
    const currentQuestion = questions[currentQuestionIndex];
    questionTextEl.textContent = currentQuestion.q;
    optionsContainer.innerHTML = '';
    selectedAnswer = null;

    // 随机打乱选项数组（保证所有选项都出现且顺序随机）
    const shuffledOptions = shuffleArray(currentQuestion.o);

    // 生成选项
    shuffledOptions.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option-item';
        optionEl.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        optionEl.addEventListener('click', () => selectOption(optionEl, option));
        optionsContainer.appendChild(optionEl);
    });

    // 自动选中指定选项（a/c/b/a/c 对应第1-5题）
    const targetOption = targetSelectedOptions[currentQuestionIndex];
    if (targetOption) {
        // 将字母转为索引（a=0, b=1, c=2）
        const targetIndex = targetOption.toLowerCase().charCodeAt(0) - 97;
        const optionElements = document.querySelectorAll('.option-item');
        if (optionElements[targetIndex]) {
            // 触发选中逻辑
            selectOption(optionElements[targetIndex], shuffledOptions[targetIndex]);
        }
    }

    // 更新状态
    feedbackStatus.textContent = "状态: 未作答";
    submitBtn.style.display = 'block';
    nextBtn.style.display = 'none';
}

// 选择选项
function selectOption(element, answer) {
    // 清除之前的选中
    document.querySelectorAll('.option-item').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedAnswer = answer;
    feedbackStatus.textContent = "状态: 已选择答案";
}

// 提交答案
submitBtn.addEventListener('click', () => {
    if (!selectedAnswer) {
        alert("请先选择一个选项！");
        return;
    }

    const questions = quizData[currentLevel];
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.a;

    // 更新反馈
    if (isCorrect) {
        correctCount++;
        score++;
        feedbackStatus.textContent = "状态: 回答正确！";
        document.querySelectorAll('.option-item').forEach(el => {
            if (el.textContent.includes(currentQuestion.a)) {
                el.classList.add('correct');
            }
        });
    } else {
        wrongCount++;
        feedbackStatus.textContent = "状态: 回答错误！";
        document.querySelectorAll('.option-item').forEach(el => {
            if (el.textContent.includes(currentQuestion.a)) {
                el.classList.add('correct');
            }
            if (el.classList.contains('selected')) {
                el.classList.add('wrong');
            }
        });
    }

    // 更新统计
    feedbackScore.textContent = `得分: ${score}/5`;
    feedbackCorrect.textContent = `正确: ${correctCount}`;
    feedbackWrong.textContent = `错误: ${wrongCount}`;

    // 禁用选项
    document.querySelectorAll('.option-item').forEach(el => {
        el.style.pointerEvents = 'none';
    });

    // 切换按钮
    submitBtn.style.display = 'none';
    if (currentQuestionIndex < questions.length - 1) {
        nextBtn.style.display = 'block';
    } else {
        feedbackStatus.textContent = `状态: 测验完成！最终得分 ${score}/5`;
    }
});

// 下一题
nextBtn.addEventListener('click', () => {
    const questions = quizData[currentLevel];
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

// 上一题
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    } else {
        alert("已经是第一题了！");
    }
});

// 重新开始
restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    selectedAnswer = null;

    // 重置反馈
    feedbackScore.textContent = "得分: 0/5";
    feedbackCorrect.textContent = "正确: 0";
    feedbackWrong.textContent = "错误: 0";
    feedbackStatus.textContent = "状态: 未作答";

    loadQuestion();
});
// 进入选关页面按钮
document.getElementById('goto-levels-btn').addEventListener('click', () => {
    window.location.href = 'level-progress.html'; // 跳转到关卡进度页
});

// 初始化页面
getLevelFromURL();
loadQuestion();