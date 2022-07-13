import React from 'react'
import { useLoginContext } from '../../../store/contexts/LoginContext'

const LoginModalPopup = () => {

  const [state, dispatch] = useLoginContext();

  const handleCloseModal = () => {
    dispatch({ type: "LOGIN_MODAL_CANCELED" });
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted')  
    dispatch({ type: "LOGIN" })
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
                <input type="text" placeholder="Enter Username" name="uname" />
    
                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" />
    
                <input type="submit" className="popup-btn-login" value="Login" style={{background: "none", border: "none", backgroundColor: "#ddd", marginTop: "8px", padding: "11px", borderRadius: "10px", width: "100%" }} />
            </div>

            <div className="login-container" style={{ backgroundColor:"#f1f1f1" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><span>No account? <a href="#"> Create one</a></span></div>
            </div>
        </form>
    </div>
  )
}

export default LoginModalPopup