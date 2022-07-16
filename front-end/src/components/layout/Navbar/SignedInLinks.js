import React from 'react'
import { Link, useNavigate, useHistory } from 'react-router-dom'
import { LOG_OUT } from '../../../store/auth/AuthTypes';
import { useLoginContext } from '../../../store/contexts/LoginContext'

// const navlinks = [ "Home", "Subjects", "Free", "Gifts" ]

const SignedInLinks = () => {

  const navigate = useNavigate();
  // const history = useHistory();
  
  const [state, dispatch] = useLoginContext();  // eslint-disable-line no-unused-vars

  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem('jwtToken');
    dispatch({ type: LOG_OUT});
    navigate('/');
  }

  return (
    <nav className='navbar'>
        <div className='logo'><Link to="/" className='Link-dec'>CourseMela</Link></div>
        <ul className="nav-links">
          <li><Link to="/" className='Link-dec'>Home</Link></li>
          <li><Link to="/" className='Link-dec'>Subjects</Link></li>
          <li><Link to="/add-course" className='Link-dec'>Add Course</Link></li>
        {/* {
            navlinks.map((navlink, index) => <li key={index}><Link to="/" className='Link-dec'>{navlink}</Link></li>)
          } */}
        </ul>
        <span className='nav-right'>
            <span><i className="fa fa-search" style={{ color: "white", fontSize: "20px" }}></i></span>
            <button className='avatar' onClick={ handleLogout}>LOGOUT</button>
            {/* <span className='login-btn'>LOGIN</span> */}
            {/* <span className='nav-right'>
                <span onClick={ handleLogout() }>JD</span>
            </span> */}
        </span>
    </nav>
  )
}

export default SignedInLinks;