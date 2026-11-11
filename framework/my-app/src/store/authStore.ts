import { create } from 'zustand';
import type { Credentials } from '../types';

export const CORRECT: Credentials = {
  email: 'user@gmail.com',
  password: 'loveIsPower',
};

interface AuthState extends Credentials {
  status: string;
  loggedIn: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  submit: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  email: localStorage.getItem('email') ?? '',
  password: localStorage.getItem('password') ?? '',
  status: '',
  loggedIn: false,

  setEmail: (email) => {
    set({ email });
  },

  setPassword: (password) => {
    set({ password });
  },

  submit: () => {
    const { email, password } = get();

    if (!email.includes('@')) {
      set({ status: 'Email должен содержать @', loggedIn: false });
      return;
    }
    if (password.length < 8) {
      set({
        status: 'Пароль должен состоять минимум из 8-ми символов',
        loggedIn: false,
      });
      return;
    }
    if (email === CORRECT.email && password === CORRECT.password) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      set({ status: 'Добро пожаловать в SpiceX!', loggedIn: true });
      return;
    }
    set({ status: 'Неверный логин или пароль', loggedIn: false });
  },
}));