import React from 'react'
import { Link } from "react-router-dom"
import { LOGIN_MODAL_PRESSED } from '../../../store/auth/AuthTypes';
import { useLoginContext } from '../../../store/contexts/LoginContext';
import {Button} from "@mui/material";
import {Login} from "@mui/icons-material";

const navlinks = [ "Home", "Subjects", "Free" ]

const SignedOutLinks = () => {
  // const [loginState, dispatch] = useReducer(authReducer, initAuthState);
  const [state, dispatch] = useLoginContext();  // eslint-disable-line no-unused-vars

  const handleLogin = () => {
      dispatch({ type: LOGIN_MODAL_PRESSED });
  }
  return (
    <nav className='navbar'>
        <div className='logo'><Link to="/" className='Link-dec'>CourseMela</Link></div>
        <ul className="nav-links">
          {
            navlinks.map((navlink, index) => <li key={index}><Link to="/" className='Link-dec'>{navlink}</Link></li>)
          }
        </ul>
        <span className='nav-right'>
            <span><i className="fa fa-search" style={{ color: "white", fontSize: "20px" }}></i></span>
            {/*<span className='login-btn' onClick={() => handleLogin()}>LOGIN</span>*/}
            <Button
                variant={'contained'}
                onClick={handleLogin}
                >
                LOGIN
            </Button>
            {/*<span className='login-btn' ><Link to='/register'>Register </Link> </span>*/}
            <Button
                variant={'contained'}
                href={'/register'}
                startIcon={<Login/>}
                color={'success'}
                >
                Register
            </Button>
        </span>

    </nav>
  )
}

export default SignedOutLinks;