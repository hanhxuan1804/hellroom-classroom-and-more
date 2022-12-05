import React from "react";
import './Navbar.css';
import {Link} from 'react-router-dom';

function Navbar(props){
    return (
        <section className="navbar">
            {props.user ? (<>
                <button className="navbar_item">
                    <Link to="/profile">Profile</Link>
                </button>
               <button className="navbar_item logout_btn" onClick={props.logOut}>
                    <Link>Logout</Link>
               </button>
               
                </>
            ) : (
            <>
            <button className="navbar_item">
                <Link to="/login">Login</Link>
            </button>
            <button className="navbar_item">
                <Link to="/register">Register</Link>
            </button>
            </>
            )}
        </section>
    )
}

export default Navbar;