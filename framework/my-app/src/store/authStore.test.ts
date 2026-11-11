import { beforeEach, describe, expect, it } from 'vitest';
import { CORRECT, useAuthStore } from './authStore';

beforeEach(() => {
  localStorage.clear();
  useAuthStore.setState({ email: '', password: '', status: '', loggedIn: false });
});

describe('authStore', () => {
  it('обновляет e-mail и пароль', () => {
    useAuthStore.getState().setEmail('a@b.c');
    useAuthStore.getState().setPassword('12345678');
    expect(useAuthStore.getState().email).toBe('a@b.c');
    expect(useAuthStore.getState().password).toBe('12345678');
  });

  it('ругается на e-mail без @', () => {
    useAuthStore.getState().setEmail('user.gmail.com');
    useAuthStore.getState().submit();
    expect(useAuthStore.getState().status).toBe('Email должен содержать @');
    expect(useAuthStore.getState().loggedIn).toBe(false);
  });

  it('ругается на короткий пароль', () => {
    useAuthStore.getState().setEmail(CORRECT.email);
    useAuthStore.getState().setPassword('1234567');
    useAuthStore.getState().submit();
    expect(useAuthStore.getState().status).toBe('Пароль должен состоять минимум из 8-ми символов');
  });

  it('отклоняет неверные данные', () => {
    useAuthStore.getState().setEmail(CORRECT.email);
    useAuthStore.getState().setPassword('wrongPass1');
    useAuthStore.getState().submit();
    expect(useAuthStore.getState().status).toBe('Неверный логин или пароль');
    expect(useAuthStore.getState().loggedIn).toBe(false);
  });

  it('пускает с верными данными и сохраняет их', () => {
    useAuthStore.getState().setEmail(CORRECT.email);
    useAuthStore.getState().setPassword(CORRECT.password);
    useAuthStore.getState().submit();
    expect(useAuthStore.getState().status).toBe('Добро пожаловать в SpiceX!');
    expect(useAuthStore.getState().loggedIn).toBe(true);
    expect(localStorage.getItem('email')).toBe(CORRECT.email);
  });
});