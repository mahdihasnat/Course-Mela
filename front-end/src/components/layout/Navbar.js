import React, { useState } from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = ({ isSignedIn }) => {
    // const [isSignedIn, setSignedIn] = useState(false);
    
    return (
        <section className="header">
            { isSignedIn ? <SignedInLinks /> : <SignedOutLinks /> }
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.isSignedIn
    }
}

export default connect(mapStateToProps)(Navbar);