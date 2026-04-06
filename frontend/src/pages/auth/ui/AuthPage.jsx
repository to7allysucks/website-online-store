import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from './RegisterForm';
import styles from './AuthForm.module.scss';

const AuthPage = () => {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className={styles.page}>
      { isLogin ? <LoginForm onSwitch={() => setIsLogin(false)}/>
      : <RegisterForm onSwitch={() => setIsLogin(true)}/>}
    </div>
  );
};

export default AuthPage;