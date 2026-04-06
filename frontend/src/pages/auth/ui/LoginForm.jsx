import { useState } from "react";
import { authApi } from "../../../features/auth/api/authApi.js";
import { useAuthStore } from "../../../features/auth/model/authStore.js";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes.js";
import styles from './LoginForm.module.scss'

export const LoginForm = (props) => {
  const {
    onswitch,
  } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
  }

  return (
    <div>
      LoginForm
    </div>
  );
};
