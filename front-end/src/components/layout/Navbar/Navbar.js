import React from "react";
import { useLoginContext } from "../../../store/contexts/LoginContext";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = () => {
    const [{ isSignedIn }, dispatch] = useLoginContext();   // eslint-disable-line no-unused-vars
    console.log(isSignedIn)
    return (
        <section className="header">
            { isSignedIn ? <SignedInLinks /> : <SignedOutLinks /> }
        </section>
    )
}

export default Navbar;