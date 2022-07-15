import React from 'react'
import axios from 'axios';
import { useLoginContext } from '../../../store/contexts/LoginContext'
import joinUrl from '../../../utils/url';
import { baseUrl } from '../../../shared/urls';
import { LoginWithDispatch } from '../../../store/storeIndex';
import { useState } from 'react';

const LoginModalPopup = () => {

  const [state, dispatch] = useLoginContext();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const handleCloseModal = () => {
    dispatch({ type: "LOGIN_MODAL_CANCELED" });
  }

  const handleSubmit = async event => {
    event.preventDefault();
    // const url = joinUrl(baseUrl, 'status');
    // console.log(url);
    // try {
    //   const response = await axios.get(url);
    //   console.log(response);
    //   // TODO: handle success response
    //   // dispatch(testServerSuccess(response.data));
    //   dispatch({ type: "LOGIN" });
    // } catch (error) {
    //   console.log(error);
    // }
    // dispatch({ type: "LOGIN" })
    LoginWithDispatch(username, pwd, dispatch)
    // dispatch(Login("jhon", "123"));	
    console.log("Login clicked ");
  }

  return (
    <div id='login-modal-id' className='modal' style={ state.isLoginPressed ? { display: "block" } : { display: "none" } }>
        <form className='modal-content animate' onSubmit={handleSubmit}>
            <div className='imgcontainer'>
                <span onClick={() => handleCloseModal()} className='close' title='Close Modal'>&times;</span>
            </div>
            <div className="login-container">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: "bold" }}>LOGIN</div>
                <label><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" onChange={e => setUsername(e.target.value)} />
    
                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" onChange={e => setPwd(e.target.value)} />
    
                <input type="submit" className="popup-btn-login" value="Login" style={{background: "none", border: "none", backgroundColor: "#ddd", marginTop: "8px", padding: "11px", borderRadius: "10px", width: "100%" }} />
            </div>

            <div className="login-container" style={{ backgroundColor:"#f1f1f1" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><span>No account? <a href="#"> Create one</a></span></div>
            </div>
        </form>
    </div>
  )
}

export default LoginModalPopup;
