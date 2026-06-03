import { useState } from "react";
import { useAuth } from "../../../features/auth/model/useAuth.js";
import styles from './AuthForm.module.scss';

export const RegisterForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  })

  const { register, error, isLoading } = useAuth()

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(formData)
    } catch {
      // Error handled by useAuth hook
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Register</h2>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />

      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.btnSubmit} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Register'}
      </button>

      <p>
        Have an account? <span onClick={onSwitch}>Log In</span>
      </p>
    </form>
  );
};