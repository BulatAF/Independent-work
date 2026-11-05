export {};

interface Credentials {
  email: string;
  password: string;
}

const CORRECT: Credentials = {
  email: 'user@gmail.com',
  password: 'loveIsPower',
};

const savedEmail = localStorage.getItem('email');
const savedPassword = localStorage.getItem('password');

const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const form = document.querySelector('form') as HTMLFormElement;
const status = document.getElementById('form-status') as HTMLElement;

if (savedEmail) {
  email.value = savedEmail;
}

if (savedPassword) {
  password.value = savedPassword;
}

function checkEmail() {
  if (!email.value.includes('@')) {
    status.textContent = 'Email должен содержать @';
    return false;
  }
  return true;
}

const checkPassword = () => {
  if (password.value.length < 8) {
    status.textContent = 'Пароль должен состоять минимум из 8-ми символов';
    return false;
  }
  return true;
};

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (checkEmail() && checkPassword()) {
    if (email.value === CORRECT.email && password.value === CORRECT.password) {
      status.textContent = 'Добро пожаловать в SpiceX!';
      localStorage.setItem('email', email.value);
      localStorage.setItem('password', password.value);
      showMask();
      playMusic();
      // form.submit();
    } else {
      status.textContent = 'Неверный логин или пароль';
    }
  }
});

function showMask() {
  const effect = document.getElementById('gif-effect') as HTMLElement;

  effect.classList.add('show');
}

function playMusic() {
  const music = document.getElementById('sound') as HTMLAudioElement;
  music.currentTime = 0;
  void music.play();
}
