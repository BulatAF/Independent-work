import type { InputHTMLAttributes } from 'react';
import type { ReactNode } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  children: ReactNode;
};

export function Checkbox({ children, ...inputProps }: CheckboxProps) {
  return (
    <div className="checkbox-row">
      <input type="checkbox" {...inputProps} />
      <label htmlFor={inputProps.id} className="keep">
        {children}
      </label>
    </div>
  );
}
