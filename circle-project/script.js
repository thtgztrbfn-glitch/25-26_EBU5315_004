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
   翻译字典与语言切换
   ========================================= */
const translations = {
    'en': {
        'nav-home': 'Home',
        'nav-quiz': 'Quiz',
        'lang-btn': '中文',
        'breadcrumb-home': 'Home',
        'current-page': 'Main Page',
        'hero-title': 'Learn Circle Geometry Easily',
        'hero-desc': 'Interactive theorems and visual proofs designed for students.',
        'hero-btn': 'Start Quiz',
        'card-1-title': 'Angle in a Semicircle',
        'card-1-desc': 'The angle in a semicircle is always 90°.',
        'card-2-title': 'Tangent and Radius',
        'card-2-desc': 'A tangent is perpendicular to the radius at the point of contact.',
        'contact-title': 'Contact Us',
        'send-btn': 'Send Message',
        'ai-title': '🤖 Circle AI Assistant',
        'ai-welcome': 'Hi! How can I help you with circle theorems today?',
        'footer-text': '© 2026 CircleLearn. Coursework Project.',
        // 占位符特殊处理
        'name-input': 'Your Name',
        'email-input': 'Your Email',
        'msg-input': 'Your Message',
        'ai-input': 'Type your question...'
    },
    'zh': {
        'nav-home': '首页',
        'nav-quiz': '测验',
        'lang-btn': 'English',
        'breadcrumb-home': '首页',
        'current-page': '主页说明',
        'hero-title': '轻松学习圆几何',
        'hero-desc': '专为学生设计的交互式定理与视觉证明。',
        'hero-btn': '开始练习',
        'card-1-title': '半圆上的圆周角',
        'card-1-desc': '半圆所对的圆周角永远是 90°。',
        'card-2-title': '切线与半径',
        'card-2-desc': '圆的切线垂直于过切点的半径。',
        'contact-title': '联系我们',
        'send-btn': '发送消息',
        'ai-title': '🤖 圆几何 AI 助手',
        'ai-welcome': '你好！今天想了解哪些关于圆的定理？',
        'footer-text': '© 2026 CircleLearn. 课程作业项目。',
        // 占位符特殊处理
        'name-input': '您的姓名',
        'email-input': '您的邮箱',
        'msg-input': '您的留言',
        'ai-input': '输入您的问题...'
    }
};
function applyLanguage(lang) {
    const data = translations[lang];
    
    Object.keys(data).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            // 如果是输入框或文本域，修改 placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = data[id];
            } else {
                // 普通标签修改 innerText
                element.innerText = data[id];
            }
        }
    });

    // 存入本地存储，这样刷新页面后语言不会变回英文
    localStorage.setItem('preferredLang', lang);
}

/* =========================================
   3. 事件监听：让按钮点击生效
   ========================================= */

// 1. 监听切换按钮的点击
document.getElementById('lang-toggle').addEventListener('click', function() {
    // 如果当前按钮文字是 "中文"，说明用户想切到中文 (zh)
    // 如果不是，说明想切回英文 (en)
    const nextLang = this.innerText === '中文' ? 'zh' : 'en';
    
    // 调用我们在第2部分写好的 applyLanguage 函数
    applyLanguage(nextLang);
});

// 2. 页面一打开，就自动加载之前保存过的语言
window.addEventListener('DOMContentLoaded', () => {
    // 看看浏览器里有没有存过语言，如果没有，默认用英文 'en'
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    applyLanguage(savedLang);
});

/* =========================================
   3. 页面初始化
   ========================================= */
window.onload = () => {
    // 默认可以给 AI 助手加一个微小的出场延迟，增加动效感
    console.log("CircleLearn v2.2 initialized.");
};
function askAI() {
    let input = document.getElementById("ai-input");
    let chatBox = document.getElementById("chat-box");

    let userText = input.value.toLowerCase();

    if(userText === "") return;

    // 显示用户消息
    let userMsg = document.createElement("p");
    userMsg.className = "user-text";
    userMsg.innerText = "You: " + userText;
    chatBox.appendChild(userMsg);

    // 清空输入框
    input.value = "";

    // AI思考
    let botMsg = document.createElement("p");
    botMsg.className = "bot-text";
    botMsg.innerText = "AI is thinking...";
    chatBox.appendChild(botMsg);

    // 延迟模拟思考
    setTimeout(() => {

        if(userText.includes("semicircle")) {
            botMsg.innerText = "The angle in a semicircle is always 90°.";
        }
        else if(userText.includes("tangent")) {
            botMsg.innerText = "A tangent is perpendicular to the radius at the point of contact.";
        }
        else if(userText.includes("radius")) {
            botMsg.innerText = "A radius connects the center of the circle to its edge.";
        }
        else {
            botMsg.innerText = "I can help with topics like semicircle, tangent, and radius!";
        }

        // 自动滚动到底部
        chatBox.scrollTop = chatBox.scrollHeight;

    }, 800);

    // 滚动到底部
    chatBox.scrollTop = chatBox.scrollHeight;
}
const fadeElements = document.querySelectorAll(".fade-in");

function handleScroll() {
    fadeElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        
        if(top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", handleScroll);

// 页面加载时执行一次（防止首屏不显示）
handleScroll();
function sendMessage() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let status = document.getElementById("form-status");

    if(name === "" || email === "" || message === "") {
        status.innerText = "Please fill in all fields.";
        status.style.color = "red";
        return;
    }

    status.innerText = "Sending...";

    setTimeout(() => {
        status.innerText = "Message sent successfully!";
        status.style.color = "#4CAF50";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
    }, 800);
}