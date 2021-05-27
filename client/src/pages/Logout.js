import React, { useContext, useEffect } from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext';
import { Link } from 'react-router-dom';

function Logout(props) {
    const { setEmail, setLoggedIn } = useContext(UserContext);
    useEffect(() => {
        API.logout()
            .then(data => {
                setLoggedIn(false);
                setEmail("");
            })
            .catch(err => {
                console.log(err);
            });
    }, [setEmail, setLoggedIn])
    return (
        <div style={{ margin: '4rem 1rem', textAlign: 'center', color: 'hsl(239, 75%, 40%)' }}>
            <h1>Thank you for using BrainScribe.</h1>
            <h2>You are now logged out.</h2>
            <h3><Link to="/login" className="text-success">Log in again?</Link></h3>
        </div>
    )
}
export default Logout;