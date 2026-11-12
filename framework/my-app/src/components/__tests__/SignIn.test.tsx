import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CORRECT, useAuthStore } from "../../store/authStore";
import { SignIn } from "../SignIn";

beforeEach(() => {
  localStorage.clear();
  useAuthStore.setState({
    email: "",
    password: "",
    status: "",
    loggedIn: false,
  });
});

async function fillAndSubmit(email: string, password: string) {
  const user = userEvent.setup();
  render(<SignIn />);
  await user.type(screen.getByPlaceholderText("Email"), email);
  await user.type(screen.getByPlaceholderText("Password"), password);
  await user.click(screen.getByRole("button", { name: "Sign in" }));
}

describe("SignIn", () => {
  it("показывает поля и кнопки", () => {
    render(<SignIn />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with Google" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("ругается на e-mail без @", async () => {
    await fillAndSubmit("user.gmail.com", "loveIsPower");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Email должен содержать @",
    );
  });

  it("ругается на короткий пароль", async () => {
    await fillAndSubmit(CORRECT.email, "1234567");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Пароль должен состоять минимум из 8-ми символов",
    );
  });

  it("отклоняет неверные данные", async () => {
    await fillAndSubmit(CORRECT.email, "wrongPass1");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Неверный логин или пароль",
    );
  });

  it("пускает с верными данными", async () => {
    await fillAndSubmit(CORRECT.email, CORRECT.password);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Добро пожаловать в SpiceX!",
    );
  });
});
