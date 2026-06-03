import { useState } from "react";
import { useAuth } from "../../../features/auth/model/useAuth.js";
import styles from './AuthForm.module.scss';

export const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch {
      // Error handled by useAuth hook
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Log In</h2>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.btnSubmit} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Log In'}
      </button>

      <p>
        Don't have an account? <span onClick={onSwitch}>Register</span>
      </p>
    </form>
  );
};
