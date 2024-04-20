import './authPage.css'
import { Register } from "../../components/Register.jsx"
import { Login } from '../../components/Login.jsx'
import { useState } from 'react'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false)
  const handleAuthPage = () => {
    setIsLogin((prev) => !prev)
  }
  return (
    <div className='auth-container'>
      {
        isLogin ? (
          <Login switchAuthAndrel={handleAuthPage} />

        ) : (
          <Register switchAuthAndrel={handleAuthPage} />
        )
      }
    </div>
  )
}