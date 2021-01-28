import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { useHistory } from 'react-router-dom';
import auth from '../api/core/auth';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #E5E5E5;
        margin-left: 106px !important;
        padding: 30px !important;
    }
`

const NavbarContainer = styled.div`
    overflow-x: hidden;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    padding: 30px 0 30px;
    background-color: white;
`;

const NavbarItem = styled.div`
    display: block;
    cursor: pointer;
    text-align: center;
    background-color: #F29DA4;
    padding: 20px 22px 20px;
    margin-bottom: 20px;
    margin: 20px;
    border-radius: 15px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
      opacity: 0.9;
      background-color: #f2c2c6;
      transform: scale(1.02)
    }
    &:active {
        opacity: 0.6;
    }
`;

const NavbarImg = styled.img`
    width: 90px;
    margin-left: 8px
`

const Navbar = () => {
    let history = useHistory();
    const [loggedIn, setLoggedIn] = useState(auth.isAuthenticated());

    const logout = ({ loggedIn }: { loggedIn: boolean }) => {
        history.push('/');
        setLoggedIn(loggedIn);
    };

    const login = ({ loggedIn }: { loggedIn: boolean }) => {
        setLoggedIn(loggedIn);
    };

    auth.addLoginSubscribers(login);
    auth.addLogoutSubscribers(logout);

    return (
        <NavbarContainer>
            <GlobalStyle/>
            <Link
            to = '/patients'>
                <NavbarImg src="https://images.typeform.com/images/aBuTPD2X63gc/image/default" />
            </Link>
            
            <Link
            to = '/dashboard'>
                <NavbarItem>
                    <i className="fas fa-user icon"></i>
                </NavbarItem>
            </Link>
            
            <Link
            to = '/patients'>
            <NavbarItem>
                <i className="fas fa-list icon"></i>
            </NavbarItem>
            </Link>
            <Link
            to = '/messageTemplate'>
                <NavbarItem >
                    <i className="fas fa-comment-dots icon"></i>
                </NavbarItem>
            </Link>
            
            <Link
            to = '/patient_add'>
                <NavbarItem >
                    <i className="fa fa-user-plus icon"></i>
                </NavbarItem>
            </Link>
            
        </NavbarContainer>
    );
};

export default Navbar;
