import React from 'react'
import { useLoginContext } from '../../../store/contexts/LoginContext'
import LoginModalPopup from './LoginModalPopup';

const LoginModal = () => {

  const [{ isLoginPressed }, dispatch] = useLoginContext();
    
  return (
    <> { isLoginPressed ? <LoginModalPopup /> : null } </>
  )
}

export default LoginModal