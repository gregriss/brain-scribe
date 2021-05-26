import React, { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import { Redirect, Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';

function Login(props) {
    const { loggedIn } = useContext(UserContext);
    return (
        <div className="container" style={{ marginTop: '5rem', padding: '1rem 1.5rem', maxWidth: '600px', border: '1px solid #DDD', borderRadius: '8px' }}>
            {loggedIn && <Redirect to="/ideas" />}
            <h1 style={{ marginBottom: '12px' }}>Login to BrainScribe</h1>
            <LoginForm className="full-page-login" />
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup" className="text-info">Sign Up</Link>
            </div>
        </div>
    )
}
export default Login;