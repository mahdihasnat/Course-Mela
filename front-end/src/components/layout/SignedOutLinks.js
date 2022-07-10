import React, { useReducer } from 'react'
import { Link } from "react-router-dom"
import authReducer, { initAuthState } from '../../store/reducers/authReducer';

const SignedOutLinks = () => {
  const [loginState, dispatch] = useReducer(authReducer, initAuthState);

  const handleLogin = () => {
      dispatch({ type: "LOGIN" });
  }
  return (
    <nav className='navbar'>
        <div className='logo'><Link to="/" className='Link-dec'>CourseMela</Link></div>
        <ul className="nav-links">
            <li><Link to="/" className='Link-dec'>Home</Link></li>
            <li><Link to="/" className='Link-dec'>Subjects</Link></li>
            <li><Link to="/" className='Link-dec'>Free</Link></li>
            <li><Link to="/" className='Link-dec'>Gift</Link></li>
        </ul>
        <span className='nav-right'>
            <span><i className="fa fa-search" style={{ color: "white", fontSize: "20px" }}></i></span>
            <span className='login-btn' onClick={() => handleLogin()}>LOGIN</span>
        </span>
    </nav>
  )
}

export default SignedOutLinks;