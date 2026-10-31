const EMAIL = "user@gmail.com";
const PASSWORD = "loveIsPower";

const savedEmail = localStorage.getItem("email");
const savedPassword = localStorage.getItem("password");

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");
const status = document.getElementById("form-status");

if (savedEmail){
  email.value = savedEmail;
}

if (savedPassword){
  password.value = savedPassword;
}

function checkEmail(){
  if (!email.value.includes("@")) {
        status.textContent = "Email должен содержать @";
        return false;
    }
    return true;
}

const checkPassword = () => {
  if (password.value.length < 8) {
      status.textContent = "Пароль должен состоять минимум из 8-ми символов";
      return false;
  }
  return true;
};

form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (checkEmail() && checkPassword()) 
  {
    if (email.value == EMAIL && password.value == PASSWORD)
    {
      status.textContent = "Добро пожаловать в SpiceX!";
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      showMask();
      playMusic();
      // form.submit();
    }
    else{
      status.textContent = "Неверный логин или пароль";
    }
  }
});


function showMask() {
  const effect = document.getElementById("gif-effect");

  effect.classList.add("show");
}

function playMusic() {
  const music = document.getElementById("sound");
  music.currentTime = 0;
  music.play();
}