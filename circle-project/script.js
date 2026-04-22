/* =========================================
   1. AI 悬浮窗开关逻辑
   ========================================= */
function toggleAI() {
    const widget = document.getElementById('ai-widget');
    const openBtn = document.getElementById('ai-open-btn');

    // 切换隐藏/显示类
    if (widget.classList.contains('ai-hidden')) {
        widget.classList.remove('ai-hidden');
        openBtn.style.display = 'none';
    } else {
        widget.classList.add('ai-hidden');
        openBtn.style.display = 'block';
    }
}

/* =========================================
   2. 语言切换逻辑 (预留)
   ========================================= */
document.getElementById('lang-toggle').addEventListener('click', function() {
    // 你可以在这里放入之前写的翻译词典逻辑
    console.log("Language toggle clicked - Ready for translation logic.");
});

/* =========================================
   3. 页面初始化
   ========================================= */
window.onload = () => {
    // 默认可以给 AI 助手加一个微小的出场延迟，增加动效感
    console.log("CircleLearn v2.2 initialized.");
};