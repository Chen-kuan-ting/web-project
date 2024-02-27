document.addEventListener("DOMContentLoaded", function () {
    // 獲取新密碼和確認新密碼的 input 元素
    var newPasswordInput = document.getElementById("newPassword");
    var confirmNewPasswordInput = document.getElementById("confirmNewPassword");

    // 獲取確認重設密碼按鈕
    var resetPasswordBtn = document.getElementById("resetPasswordBtn");

    // 初始化時禁用確認重設密碼按鈕
    resetPasswordBtn.disabled = true;

    // 添加輸入事件監聽器
    newPasswordInput.addEventListener("input", checkInputs);
    confirmNewPasswordInput.addEventListener("input", checkInputs);

    function checkInputs() {
        // 獲取新密碼和確認新密碼的值
        var newPasswordValue = newPasswordInput.value.trim();
        var confirmNewPasswordValue = confirmNewPasswordInput.value.trim();

        // 如果新密碼或確認新密碼任一為空，或者兩者不相符，則禁用按鈕；否則，啟用按鈕。
        if (newPasswordValue === "" || confirmNewPasswordValue === "" || newPasswordValue !== confirmNewPasswordValue) {
            resetPasswordBtn.disabled = true;
            resetPasswordBtn.classList.remove("valid"); // 移除亮色樣式
        } else {
            resetPasswordBtn.disabled = false;
            resetPasswordBtn.classList.add("valid"); // 添加亮色樣式
        }
    }
});
