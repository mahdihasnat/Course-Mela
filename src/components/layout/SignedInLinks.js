import React, { useReducer } from 'react'
import authReducer, { initAuthState } from "../../store/reducers/authReducer";
import { Link } from 'react-router-dom'

const SignedInLinks = () => {
  const [loginState, dispatch] = useReducer(authReducer, initAuthState);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
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
            <span><i class="fa fa-search" style={{ color: "white", fontSize: "20px" }}></i></span>
            <span className='avatar' onClick={ () => handleLogout() }>JD</span>
            {/* <span className='login-btn'>LOGIN</span> */}
            {/* <span className='nav-right'>
                <span onClick={ handleLogout() }>JD</span>
            </span> */}
        </span>
    </nav>
  )
}

export default SignedInLinks;