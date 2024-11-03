import React from "react";

function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navigation-left"> 
                <a href="/">Home</a>
                <a href="/explore">Explore</a>
                <a href="/list">List Your Surfboard</a>   
            </div>
            <div className="navigation-right">
                <a href="/account">My Account</a>
            </div> 
        </div>
    );
}

export default Navbar;