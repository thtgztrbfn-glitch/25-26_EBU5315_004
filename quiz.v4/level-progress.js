// 读取本地存储的进度
function getProgress() {
    const saved = localStorage.getItem('circleQuizProgress');
    return saved ? JSON.parse(saved) : { level1: false, level2: false, level3: false };
}

// 保存进度
function saveProgress(level) {
    const progress = getProgress();
    progress[level] = true;
    localStorage.setItem('circleQuizProgress', JSON.stringify(progress));
    updateUI();
}

// 更新界面 —— 默认全部解锁
function updateUI() {
    const progress = getProgress();

    // 关卡1
    if (progress.level1) {
        document.getElementById('level1-status').textContent = "已完成";
        document.getElementById('level1-btn').textContent = "重新挑战";
    } else {
        document.getElementById('level1-status').textContent = "已解锁";
        document.getElementById('level1-btn').textContent = "开始挑战";
    }

    // 关卡2 —— 默认直接解锁
    document.getElementById('level2-card').classList.remove('locked');
    document.getElementById('level2-btn').disabled = false;
    if (progress.level2) {
        document.getElementById('level2-status').textContent = "已完成";
        document.getElementById('level2-btn').textContent = "重新挑战";
    } else {
        document.getElementById('level2-status').textContent = "已解锁";
        document.getElementById('level2-btn').textContent = "开始挑战";
    }

    // 关卡3 —— 默认直接解锁
    document.getElementById('level3-card').classList.remove('locked');
    document.getElementById('level3-btn').disabled = false;
    if (progress.level3) {
        document.getElementById('level3-status').textContent = "已完成";
        document.getElementById('level3-btn').textContent = "重新挑战";
    } else {
        document.getElementById('level3-status').textContent = "已解锁";
        document.getElementById('level3-btn').textContent = "开始挑战";
    }
}

// 开始关卡
function startLevel(level) {
    window.location.href = `quiz.html?level=${level}`;
}

// 页面加载时更新UI
updateUI();