import React from 'react'
import axios from 'axios';
import { useLoginContext } from '../../../store/contexts/LoginContext'
import joinUrl from '../../../utils/url';
import { baseUrl } from '../../../shared/urls';
import { LOGIN_MODAL_CANCELED } from '../../../store/auth/AuthTypes';

import {connect} from 'react-redux';
import { Login } from '../../../store/storeIndex';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { useNavigate } from 'react-router-dom';

const LoginModalPopup = (props) => {

  const [state, dispatch] = useLoginContext();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    dispatch({ type: LOGIN_MODAL_CANCELED });
  }

  const handleSubmit = (event)=>{
    console.log('handleSubmit');
    event.preventDefault();
    const username = "jhon";
    const password = '123';

    props.login(username, password);
      if(props.isLoggedIn){
      dispatch({ type: LOGIN_MODAL_CANCELED });
      navigate('/server');
    }
    // Login(username, password);



  }

  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   const url = joinUrl(baseUrl, 'status');
  //   console.log(url);
  //   try {
  //     const response = await axios.get(url);
  //     console.log(response);
  //     // TODO: handle success response
  //     // dispatch(testServerSuccess(response.data));
  //     dispatch({ type: "LOGIN" });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // dispatch({ type: "LOGIN" })
  // }

  return (
    <div id='login-modal-id' className='modal' style={ state.isLoginPressed ? { display: "block" } : { display: "none" } }>
        <form className='modal-content animate' onSubmit={handleSubmit}>
            <div className='imgcontainer'>
                <span onClick={() => handleCloseModal()} className='close' title='Close Modal'>&times;</span>
            </div>
            <div className="login-container">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: "bold" }}>LOGIN</div>
                <label><b>Username</b></label>
                <input type="text"  placeholder="Enter Username" name="uname" />
    
                <label><b>Password</b></label>
                <input type="password"  placeholder="Enter Password" name="psw" />
    
                <input type="submit" className="popup-btn-login" value="Login" style={{background: "none", border: "none", backgroundColor: "#ddd", marginTop: "8px", padding: "11px", borderRadius: "10px", width: "100%" }} />
            </div>

            <div className="login-container" style={{ backgroundColor:"#f1f1f1" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><span>No account? <a href="#"> Create one</a></span></div>
            </div>
        </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoginPressed: state.auth.isLoginPressed,
    isLoggedIn: state.auth.isSignedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login : (userName, password) =>{
      console.log('login', userName, password);
      dispatch(Login(userName, password));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalPopup);