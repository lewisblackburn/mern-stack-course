import React, { useState } from 'react'
import Card from '../../shared/components/UIElements/Card'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import Button from '../../shared/components/FormElements/Button'

const Auth = (props) => {
  const [isLoginMode, setIsLoginMode] = useState(true)

  const switchModeHandler = () => {
    setIsLoginMode((prevmode) => !prevmode)
  }

  return (
    <>
      <Card>{isLoginMode ? <LoginForm /> : <SignupForm />}</Card>
      <Button onClick={switchModeHandler} danger>
        Switch To {isLoginMode ? 'Signup' : 'Login'}
      </Button>
    </>
  )
}

export default Auth
