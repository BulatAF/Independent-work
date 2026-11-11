import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { TextInput } from './TextInput';

export function SignIn() {
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);
  const status = useAuthStore((state) => state.status);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const submit = useAuthStore((state) => state.submit);
  const [keep, setKeep] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  return (
    <main className="main">
      <div className="form">
        <form noValidate onSubmit={handleSubmit}>
          <h2>Sign in</h2>

          <div>
            <Button>Continue with Google</Button>
          </div>
          <div>
            <Button>Continue with Apple</Button>
          </div>

          <p id="central_or">or</p>

          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <a href="https://www.youtube.com/watch?v=BL8ZKeGCaIg">Forgot password?</a>

          <Checkbox
            id="keep"
            name="keep"
            checked={keep}
            onChange={(event) => setKeep(event.target.checked)}
          >
            Keep me logged in?
          </Checkbox>

          <p id="form-status" role="status">
            {status}
          </p>

          <Button type="submit">Sign in</Button>
        </form>
      </div>
    </main>
  );
}