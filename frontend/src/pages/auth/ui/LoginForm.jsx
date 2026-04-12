import { useState } from "react";
import { authApi } from "../../../features/auth/api/authApi.js";
import { useAuthStore } from "../../../features/auth/model/authStore.js";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes.js";
import styles from './AuthForm.module.scss';

export const LoginForm = (props) => {
  const {
    onSwitch,
  } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const {access_token} = await authApi.login({email, password})
      const user = await authApi.getMe()
      setAuth(user, access_token)
      navigate(ROUTES.HOME)
    }
    catch {
      setError('Error')
    }
  }

  return (
    <form  onSubmit={handleSubmit} className={styles.form}>
      <h2>Log In</h2>
      <label htmlFor="email">Email</label>
      <input 
      type="email" 
      name="email"
      placeholder="Email"
      value={email}
      onChange={ (e) => setEmail(e.target.value)}/>

      <label htmlFor="password">Password</label>
      <input 
      type="password"
      name="password"
      placeholder="Password"
      value={password}
      onChange={ (e) => setPassword(e.target.value) } />
      {error && <p className={styles.error}>{error}</p>}
      <button type='submit' className={styles.btnSubmit}>Log In</button>

      <p>
        Dont have account? <span onClick={onSwitch}>Register</span>
      </p>
    </form>
  );
};
