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

  const [formData, setFormData] = useState({
    'email': '',
    'password': '',
    'first_name': '',
    'last_name': '',
  })

  const [error, setError] = useState('')
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
     e.preventDefault()
     setError('')

     try {
      await authApi.register(formData)

      const { access_token } = await authApi.login({
          email: formData.email,
          password: formData.password
      })

      const user = await authApi.getMe()
      
      setAuth(user, access_token)
      navigate(ROUTES.HOME)

     }
     catch {
      setError('error')
     }
  }

  return (
    <form className={styles.form}>
          <h2>Register</h2>
    
          <label htmlFor="email">Email</label>
          <input 
          type="email" 
          name="email"
          placeholder="Email"
          onChange={handleChange}/>
    
          <label htmlFor="password">Password</label>
          <input 
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}/>

          <label htmlFor="first_name">First Name</label>
          <input 
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}/>

          <label htmlFor="last_name">Last Name</label>
          <input 
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}/>
          {error && <p className={styles.error}>{error}</p>}
          <button onClick={handleSubmit} className={styles.btnSubmit}>Register</button>
    
          <p>
            Have a account?  <span onClick={onSwitch}>Log In</span>
          </p>
        </form>
  );
};