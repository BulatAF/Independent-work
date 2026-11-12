import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('показывает текст и по умолчанию не отправляет форму', () => {
    render(<Button>Нажми</Button>);
    expect(screen.getByRole('button', { name: 'Нажми' })).toHaveAttribute('type', 'button');
  });

  it('вызывает onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Нажми</Button>);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Нажми' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});