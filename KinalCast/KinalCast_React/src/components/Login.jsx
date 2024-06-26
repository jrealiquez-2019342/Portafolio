import { useState } from "react";
import { Input } from "./Input.jsx";
import { emailValidationMessage, passwordValidationMessage, validateEmail, validatePassword } from "../shared/validators/validator.js";
import { useLogin } from "../shared/hooks/useLogin.jsx";

export const Login = ({ switchAuthAndrel }) => {
  const { login, isLoading } = useLogin();
  const [formData, setFormData] = useState(
    {
      email: {
        value: '',
        isValid: false,
        showError: false
      },
      password: {
        value: '',
        isValid: false,
        showError: false
      }
    }
  )
  const isSubmitButtonDisable = !formData.email.isValid ||
    !formData.password.isValid

  const handleValueChange = (value, field) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          value
        }
      }
    ))
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'email':
        isValid = validateEmail(value)
        break;
      case 'password':
        isValid = validatePassword(value)
        break;
      default:
        break;
    }
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          isValid,
          showError: !isValid

        }
      }
    ))
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    login(
      formData.email.value,
      formData.password.value
    )
    console.log(formData);
  };


  return (
    <div className='login-container'>
      <form
        className='auth-form'
        onSubmit={handleRegister}
      >
        <Input
          field='email'
          label='Email'
          value={formData.email.value}
          onChangeHandler={handleValueChange}
          type="email"
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.email.showError}
          validationMessage={emailValidationMessage}
        />
        <Input
          field='password'
          label='Password'
          value={formData.password.value}
          onChangeHandler={handleValueChange}
          type="password"
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
        />
        <button
          disabled={isSubmitButtonDisable}
        >
          Login
        </button>

      </form>
      <span onClick={switchAuthAndrel}>
        ¿Aún no tienes una cuenta?
      </span>
    </div>
  )
}
