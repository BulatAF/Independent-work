import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';

export function ElonMask() {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (loggedIn && audio) {
      audio.currentTime = 0;
      void audio.play();
    }
  }, [loggedIn]);

  return (
    <div id="gif-effect" className={loggedIn ? 'show' : ''}>
      <img src="/assets/animations/elon-musk.gif" alt="Анимация" />
      <audio ref={audioRef} src="/assets/sounds/snoopDog.mp3" />
    </div>
  );
}