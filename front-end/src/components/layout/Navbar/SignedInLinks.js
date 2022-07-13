import React from 'react'
import { Link } from 'react-router-dom'
import { useLoginContext } from '../../../store/contexts/LoginContext'

const navlinks = [ "Home", "Subjects", "Free", "Gifts" ]

const SignedInLinks = () => {

  const [state, dispatch] = useLoginContext();  // eslint-disable-line no-unused-vars

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
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