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
        var email = document.getElementById("email").value.trim();
        var account = document.getElementById("account").value.trim();
        
        // 創建一個 JSON 物件，包含要發送到後端的數據
        var data = {
            email: email,
            account: account
        };

        // 發送 POST 請求,第一個參數是請求的 URL，第二個參數是一個配置對象，包含請求的詳細參數，如方法、標頭和主體,並將 JSON 格式的資料 data 作為主體發送到後端。
        fetch("/check-registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)      //data 物件轉換為 JSON 字符串，以便將其作為 POST 請求的主體(body)發送到後端。這樣後端就能夠解析 JSON 格式的數據，並從中提取出用戶提交的電子郵件和帳號資料進行處理。
        })
        .then(response => response.json())      //.then() 方法用於定義當前一個 Promise 成功時的回調函數，這裡的回調函數將返回的響應轉換為 JSON 格式。
        .then(result => {
            if (result.isRegistered) {
                alert("此電子郵件或帳號已註冊過！");
            } else {
                alert("會員建立成功");
            }
        })
        .catch(error => console.error("發生錯誤：", error));
    }
});

