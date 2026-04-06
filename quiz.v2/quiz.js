// 题库（学前儿童数学）
const questions = [
  { q: "1 + 1 = ?", opt: ["1", "2", "3", "4"], ans: 1 },
  { q: "3 - 1 = ?", opt: ["1", "2", "3", "0"], ans: 1 },
  { q: "2 + 3 = ?", opt: ["4", "5", "6", "7"], ans: 1 },
  { q: "5 - 2 = ?", opt: ["2", "3", "4", "1"], ans: 1 },
  { q: "4 + 0 = ?", opt: ["0", "3", "4", "5"], ans: 2 }
];

let currentQ = 0;
let score = 0;
let used = [];

window.onload = init();

function init() {
  currentQ = 0;
  score = 0;
  used = [];
  loadQ();
}

function loadQ() {
  if (currentQ >= 5) {
    showResult();
    return;
  }

  let available = questions.filter((_, i) => !used.includes(i));
  let rand = Math.floor(Math.random() * available.length);
  let qObj = available[rand];
  let idx = questions.indexOf(qObj);
  used.push(idx);

  document.getElementById("question").innerText = qObj.q;
  document.getElementById("qNum").innerText = currentQ + 1;
  document.getElementById("score").innerText = score;
  document.getElementById("feedback").innerText = "";
  document.getElementById("nextBtn").disabled = true;

  let optBox = document.getElementById("options");
  optBox.innerHTML = "";

  qObj.opt.forEach((item, i) => {
    let btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = item;
    btn.onclick = () => check(btn, i, qObj.ans);
    optBox.appendChild(btn);
  });
}

function check(btn, sel, ans) {
  let all = document.querySelectorAll(".option");
  all.forEach(b => b.disabled = true);

  if (sel === ans) {
    btn.classList.add("correct");
    document.getElementById("feedback").innerText = "✅ Correct!";
    document.getElementById("feedback").style.color = "green";
    score++;
  } else {
    btn.classList.add("wrong");
    all[ans].classList.add("correct");
    document.getElementById("feedback").innerText = "❌ Oops!";
    document.getElementById("feedback").style.color = "red";
  }

  document.getElementById("nextBtn").disabled = false;
}

document.getElementById("nextBtn").onclick = () => {
  currentQ++;
  loadQ();
};

function showResult() {
  document.getElementById("finalScore").innerText = score;
  document.getElementById("result").style.display = "block";
}

function restart() {
  document.getElementById("result").style.display = "none";
  init();
}