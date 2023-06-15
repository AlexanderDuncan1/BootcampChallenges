const generateBtn = document.querySelector("#generate");
const copyBtn = document.querySelector("#copy");

function writePassword() {
  const passwordLength = parseInt(prompt("Enter desired password length (between 8 and 128 characters):"));

  if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
    alert("Not a valid response. Select between 8 and 128.");
    return;
  }

  const includeLowercase = confirm("Do you need lowercase letters?");
  const includeCapital = confirm("Do you need capital letters?");
  const includeNumbers = confirm("Do you need numbers?");
  const includeSpecial = confirm("Do you need special characters?");

  const password = generatePassword(passwordLength, includeLowercase, includeCapital, includeNumbers, includeSpecial);

  if (password !== null) {
    passwordText.value = password;
  }
}

function generatePassword(length, includeLowercase, includeCapital, includeNumbers, includeSpecial) {
  let charset = "";

  if (includeLowercase) {
    charset += "qwertyuiopasdfghjklzxcvbnm";
  }

  if (includeCapital) {
    charset += "QWERTYUIOPASDFGHJKLZXCVBNM";
  }

  if (includeNumbers) {
    charset += "1234567890";
  }

  if (includeSpecial) {
    charset += "!@#$%^&*()";
  }

  if (charset === "") {
    alert("No options selected.");
    return null;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

function copyPassword() {
  passwordText.select();
  document.execCommand("copy");
  alert("Password copied to the clipboard");
}

generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyPassword);