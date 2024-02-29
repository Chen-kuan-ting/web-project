// blur 事件在一個元素失去焦點時觸發
document.getElementById("password").addEventListener("blur", function () {
    var passwordInput = document.getElementById("password");
    var password = passwordInput.value.trim();

    // 檢查密碼長度和包含至少一個英文字母
    var isValidPassword = password.length >= 6 && /[a-zA-Z]/.test(password);

    if (!isValidPassword) {
        document.getElementById("passwordHelp").textContent = "密碼至少要6個字元，且包含一個英文字母。";
    } else {
        document.getElementById("passwordHelp").textContent = "";
    }
});


// keydown事件在鍵盤上的按鍵被按下時觸發
document.getElementById("phone").addEventListener("keydown", function (event) {
    // 允許數字、退格鍵和刪除鍵
    if (!(event.key >= "0" && event.key <= "9") && event.key !== "Backspace" && event.key !== "Delete") {
        event.preventDefault(); // 阻止非數字的輸入,包含阻止貼上功能
    }
});
// blur 事件在一個元素失去焦點時觸發
document.getElementById("phone").addEventListener("blur", function () {
    var phoneInput = document.getElementById("phone");
    var phoneValue = phoneInput.value.trim();

    if (phoneValue.length !== 10) {
        document.getElementById("phoneHelp").textContent = "請輸入完整手機號碼10個數字";
    } else {
        document.getElementById("phoneHelp").textContent = "";
    }
});

// click 事件在使用者點擊元素時觸發
document.getElementById("send").addEventListener("click", function () {
    // 檢查所有帶有required屬性的輸入資料是否都有值
    var isValid = Array.from(
        document.querySelectorAll("input[required]")
    ).every(function (input) {
        return input.value.trim() !== "";
    });
    if (!isValid) {
        alert("請填寫完整所有資料！");
    } else {
        alert("會員建立成功");
    }
});
