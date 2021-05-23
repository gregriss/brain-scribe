import React, { Fragment, useContext, useRef, useState } from 'react';
// import "./style.scss";
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';

function SignUpForm(props) {
    const { email, setEmail, loggedIn, setLoggedIn } = useContext(UserContext);
    const emailInput = useRef();
    const passwordInput = useRef();
    const [error, setError] = useState('');
    let extraProps = {}
    if (props.className) {
        extraProps.className = props.className;
    }
    let emailId = props.className ? props.className + "-signup-email" : "signup-email";
    let emailHelpId = props.className ? props.className + "-signup-email-help" : "signup-email-help";
    let passwordId = props.className ? props.className + "-signup-password" : "signup-password";

    async function handleSubmit(event) {
        // if the user hits enter or hits the button, this function will fire
        event.preventDefault();
        // console.log("submit happened");
        // console.log({ email: emailInput.current.value, password: passwordInput.current.value});
        // API.testUserRouter()
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        try {
            setError('')
            await API.signup({ email: emailInput.current.value, password: passwordInput.current.value })
                .then(data => {
                    // console.log(data);
                    setEmail(data.data.email);
                    setLoggedIn(true);
                })
            // .catch(err => {
            //     console.log(err);
            // });
        } catch {
            setError('Account creation failed. Email may already be in use.')
        }
    }
    return (
        <Fragment>
            { (() => {
                if (!loggedIn) {
                    return (
                        <form {...extraProps} onSubmit={handleSubmit}>
                            {error && <div className="alert alert-danger" role="alert" style={{ margin: '20px 0' }}>{error}</div>}
                            <div className="form-group">
                                <label htmlFor={emailId}>Email address</label>
                                <input ref={emailInput} type="email" className="form-control" id={emailId} aria-describedby={emailHelpId} />
                                <small id={emailHelpId} className="email-help-text form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor={passwordId}>Password</label>
                                <input ref={passwordInput} type="password" className="form-control" id={passwordId} />
                            </div>
                            <button type="submit" className="btn btn-success btn-block">Sign Up</button>
                        </form>
                    );
                }
                else {
                    return <h3>{email}</h3>;
                }
            })()
            }
        </Fragment>
    )
}

export default SignUpForm;