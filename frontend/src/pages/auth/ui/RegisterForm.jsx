import { useState } from "react";
import { authApi } from "../../../features/auth/api/authApi";
import { useAuthStore } from "../../../features/auth/model/authStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes";
import styles from './AuthForm.module.scss';

export const RegisterForm = (props) => {
  const {
    onSwitch
  } = props

  const [FormData, setformData] = useState({
    'email': '',
    'password': '',
    'first_name': '',
    'last_name': '',
  })

  const [error, setError] = useState('')
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setformData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
     e.preventDefault()
     setError('')

     try {
      authApi.register(FormData)

      const { access_token } = await authApi.login({
          email: FormData.email,
          password: FormData.password
      })

      const user = await authApi.getMe()
      
      setAuth(user, access_token)
      navigate(ROUTES.HOME)

     }
     catch {
      setError('Ошибка')
     }
  }

  return (
    <form className={styles.form}>
          <h2>Register</h2>
          {error && <p className={styles.error}>{error}</p>}
    
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

          <label htmlFor="first_name">First Name</label>
          <input 
          type="text"
          name="first_name"
          placeholder="First Name"
          value={first_name}
          onChange={ (e) => setPassword(e.target.value) } />

          <label htmlFor="last_name">Last Name</label>
          <input 
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={last_name}
          onChange={ (e) => setPassword(e.target.value) } />
    
          <button onClick={handleSubmit} className={styles.btnSubmit}>Register</button>
    
          <p className={styles.hint}>
            Have a account?  <span onClick={onSwitch}>Log In</span>
          </p>
        </form>
  );
};