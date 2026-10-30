const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const statusMessage = document.getElementById("form-status");
const keepCheckbox = document.getElementById("keep");

const CORRECT_EMAIL = "user@example.com";
const CORRECT_PASSWORD = "spicex2026";

const STORAGE_KEY = "spicex-email";

function validateEmail(value) {
    if (value === "") {
        return "Введите e-mail";
    }
    // что-то@что-то.домен (без пробелов, минимум 2 символа в конце)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        return "Введите e-mail в формате name@example.com";
    }
    return "";
}

function validatePassword(value) {
    if (value === "") {
        return "Введите пароль";
    }
    if (value.length < 8) {
        return "Пароль должен быть не короче 8 символов";
    }
    if (!/[A-Za-zА-Яа-яЁё]/.test(value)) {
        return "Добавьте в пароль хотя бы одну букву";
    }
    if (!/\d/.test(value)) {
        return "Добавьте в пароль хотя бы одну цифру";
    }
    return "";
}

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
}

function showStatus(text, isSuccess) {
    statusMessage.textContent = text;
    statusMessage.className = isSuccess ? "success" : "fail";
}

function saveEmail(email) {
    try {
        localStorage.setItem(STORAGE_KEY, email);
    } catch (error) {
        // хранилище недоступно
    }
}

function loadEmail() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        return null;
    }
}

function forgetEmail() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        // хранилище недоступно
    }
}

function checkEmail() {
    const message = validateEmail(emailInput.value.trim());
    showError(emailInput, emailError, message);
    return message;
}

function checkPassword() {
    const message = validatePassword(passwordInput.value);
    showError(passwordInput, passwordError, message);
    return message;
}

emailInput.addEventListener("blur", checkEmail);
passwordInput.addEventListener("blur", checkPassword);

emailInput.addEventListener("input", () => {
    if (emailError.textContent) {
        checkEmail();
    }
});
passwordInput.addEventListener("input", () => {
    if (passwordError.textContent) {
        checkPassword();
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault(); // страница не перезагружается
    statusMessage.textContent = "";

    const emailMessage = checkEmail();
    const passwordMessage = checkPassword();

    if (emailMessage) {
        emailInput.focus();
        return;
    }
    if (passwordMessage) {
        passwordInput.focus();
        return;
    }

    const emailIsCorrect = emailInput.value.trim().toLowerCase() === CORRECT_EMAIL;
    const passwordIsCorrect = passwordInput.value === CORRECT_PASSWORD;

    if (emailIsCorrect && passwordIsCorrect) {
        showStatus("Добро пожаловать в SpiceX!", true);

        if (keepCheckbox.checked) {
            saveEmail(emailInput.value.trim().toLowerCase());
        } else {
            forgetEmail();
        }
    } else {
        showStatus("Неверный e-mail или пароль", false);
    }
});

form.addEventListener("reset", () => {
    showError(emailInput, emailError, "");
    showError(passwordInput, passwordError, "");
    statusMessage.textContent = "";
});

const savedEmail = loadEmail();
if (savedEmail) {
    emailInput.value = savedEmail;
    keepCheckbox.checked = true;
}