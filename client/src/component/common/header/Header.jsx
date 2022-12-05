import React from 'react';
import {Navbar} from '../../common'
import { Link } from 'react-router-dom';
import './Header.css';

function Header(props)
{
    const {user, logOut} = props;
    return (
        <section className='header'>
            <section className='header_logo'>
                <Link to='/'>LOGO</Link>
            </section>
            <section className='header_navbar'>
                <Navbar user={user} logOut={logOut} />
            </section>
        </section>
    );
}

export default Header;