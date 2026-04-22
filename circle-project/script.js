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