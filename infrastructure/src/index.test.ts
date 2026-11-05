import { beforeEach, describe, expect, it, vi } from 'vitest';

function byId(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Элемент #${id} не найден`);
  }
  return element;
}

function setupPage(): void {
  document.body.innerHTML = `
    <form>
      <input id="email" />
      <input id="password" type="password" />
      <p id="form-status"></p>
      <button type="submit">Sign in</button>
    </form>
    <div id="gif-effect"></div>
    <audio id="sound"></audio>
  `;
}

async function loadApp(): Promise<void> {
  vi.resetModules();
  await import('./index');
}

function submitForm(email: string, password: string): void {
  (byId('email') as HTMLInputElement).value = email;
  (byId('password') as HTMLInputElement).value = password;
  document
    .querySelector('form')
    ?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
}

function status(): string {
  return byId('form-status').textContent;
}

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  setupPage();
});

describe('форма входа', () => {
  it('ругается на e-mail без @', async () => {
    await loadApp();
    submitForm('user.gmail.com', 'loveIsPower');
    expect(status()).toBe('Email должен содержать @');
  });

  it('ругается на короткий пароль', async () => {
    await loadApp();
    submitForm('user@gmail.com', '1234567');
    expect(status()).toBe('Пароль должен состоять минимум из 8-ми символов');
  });

  it('отклоняет неверные данные', async () => {
    await loadApp();
    submitForm('user@gmail.com', 'wrongPass1');
    expect(status()).toBe('Неверный логин или пароль');
  });

  it('пускает с верными данными, сохраняет их и показывает эффекты', async () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockResolvedValue(undefined);
    await loadApp();
    submitForm('user@gmail.com', 'loveIsPower');

    expect(status()).toBe('Добро пожаловать в SpiceX!');
    expect(localStorage.getItem('email')).toBe('user@gmail.com');
    expect(byId('gif-effect').classList.contains('show')).toBe(true);
    expect(play).toHaveBeenCalledOnce();
  });

  it('подставляет сохранённый e-mail при загрузке', async () => {
    localStorage.setItem('email', 'saved@gmail.com');
    await loadApp();
    expect((byId('email') as HTMLInputElement).value).toBe('saved@gmail.com');
  });
});
