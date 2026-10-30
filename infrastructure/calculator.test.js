import { sum, multiply } from './calculator.js';

describe('Calculator tests', () => {
  test('adds 2 + 3 to equal 5', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('multiplies 4 * 2 to equal 8', () => {
    expect(multiply(4, 2)).toBe(8);
  });
});
