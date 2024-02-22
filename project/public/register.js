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

document.getElementById("send").addEventListener("click", function () {
  // 檢查所有帶有required屬性的輸入資料是否都有值
  var isValid = Array.from(
      document.querySelectorAll("input[required]")
  ).every(function (input) {
      return input.value.trim() !== "";
  });

  // 檢查密碼是否有效
  var password = document.getElementById("password").value.trim();
  var isValidPassword = password.length >= 6 && /[a-zA-Z]/.test(password);

  if (!isValidPassword) {
      document.getElementById("passwordHelp").textContent = "密碼至少要6個字元，且包含一個英文字母。";
      isValid = false;
  }

  if (!isValid) {
      alert("請填寫完整所有資料！");
  } else {
      alert("會員建立成功");
  }
});
