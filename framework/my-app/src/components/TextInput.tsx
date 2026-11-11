import type { InputHTMLAttributes } from 'react';

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <input {...props} />
    </div>
  );
}