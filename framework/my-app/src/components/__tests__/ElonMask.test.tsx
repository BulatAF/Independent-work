import { act, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthStore } from '../../store/authStore';
import { ElonMask } from '../ElonMask';

beforeEach(() => {
  vi.restoreAllMocks();
  useAuthStore.setState({ loggedIn: false });
});

describe('ElonMask', () => {
  it('скрыт, пока пользователь не вошёл', () => {
    const { container } = render(<ElonMask />);
    expect(container.querySelector('#gif-effect')).not.toHaveClass('show');
  });

  it('показывается и включает звук после входа', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    const { container } = render(<ElonMask />);

    act(() => {
      useAuthStore.setState({ loggedIn: true });
    });

    expect(container.querySelector('#gif-effect')).toHaveClass('show');
    expect(play).toHaveBeenCalledOnce();
  });
});