import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('показывает приветствие', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Привет!');
  });
});