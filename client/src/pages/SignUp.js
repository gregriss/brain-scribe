import React, { useContext } from 'react';
import SignUpForm from '../components/SignUpForm';
import { Redirect, Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';

function SignUp(props) {
    const { loggedIn } = useContext(UserContext);
    return (
        <div className="container" style={{ marginTop: '5rem', padding: '1rem 1.5rem', maxWidth: '600px', border: '1px solid #DDD', borderRadius: '8px' }}>
            {loggedIn && <Redirect to="/ideas" />}
            <h1 style={{ marginBottom: '12px' }}>Sign Up for BrainScribe</h1>
            <SignUpForm className="full-page-signup" />
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login" className="text-info">Log In</Link>
            </div>
        </div>
    )
}
export default SignUp;