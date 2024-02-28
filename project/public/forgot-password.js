document.addEventListener("DOMContentLoaded", function () {
    // 獲取電子郵件輸入框和確認重設密碼按鈕
    var emailInput = document.getElementById("email");
    var resetPasswordBtn = document.getElementById("resetPasswordBtn");

    // 初始化時禁用確認重設密碼按鈕
    resetPasswordBtn.disabled = true;

    // 添加輸入事件監聽器
    emailInput.addEventListener("input", checkInputs);

    function checkInputs() {
        // 獲取電子郵件的值
        var emailValue = emailInput.value.trim();

        // 如果電子郵件為空，則禁用確認重設密碼按鈕；否則，啟用按鈕。
        resetPasswordBtn.disabled = emailValue === "";
        updateButtonStyle();
    }

    // 更新按鈕樣式
    function updateButtonStyle() {
        if (resetPasswordBtn.disabled ==="") {
            resetPasswordBtn.classList.remove("valid");
        } else {
            resetPasswordBtn.classList.add("valid");
        }
    }
});
