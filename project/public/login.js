document.addEventListener("DOMContentLoaded", function () {
    // 獲取帳號和密碼的 input 元素
    var accountInput = document.getElementById("account");
    var passwordInput = document.getElementById("password");
  
    // 獲取登入按鈕
    var loginButton = document.getElementById("login");
  
    // 初始化時禁用登入按鈕
    loginButton.disabled = true;
  
    // 添加輸入事件監聽器
    accountInput.addEventListener("input", checkInputs);
    passwordInput.addEventListener("input", checkInputs);
  
    function checkInputs() {
      // 獲取帳號和密碼的值
      var accountValue = accountInput.value.trim();
      var passwordValue = passwordInput.value.trim();
      // 使用 `trim()` 方法去除字串首尾的空白，確保只有輸入內容才會被考慮
      
      // 如果帳號或密碼任一為空，則 loginButton.disabled 將被設為 true，即禁用按鈕；否則，它將被設為 false，即啟用按鈕。
      loginButton.disabled = accountValue === "" || passwordValue === "";
    }
  });
  