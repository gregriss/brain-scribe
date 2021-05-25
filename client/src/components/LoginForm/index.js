import React, { Fragment, useContext, useRef, useState } from 'react';
import "./style.scss";
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';
import { useHistory } from "react-router-dom";

function LoginForm(props) {
    const { email, setEmail, loggedIn, setLoggedIn } = useContext(UserContext);
    const history = useHistory();
    const emailInput = useRef();
    const passwordInput = useRef();
    const [error, setError] = useState('');

    let extraProps = {}
    if (props.className) {
        extraProps.className = props.className;
    }
    let emailId = props.className ? props.className + "-login-email" : "login-email";
    let emailHelpId = props.className ? props.className + "-login-email-help" : "login-email-help";
    let passwordId = props.className ? props.className + "-login-password" : "login-password";

    async function handleSubmit(event) {
        // if the user hits enter or hits the button, this function will fire
        event.preventDefault();

        try {
            setError('')
            await API.login({ email: emailInput.current.value, password: passwordInput.current.value })
                .then(data => {
                    // console.log(data);
                    setEmail(data.data.email);
                    setLoggedIn(true);
                    history.push("/");
                })
            // .catch(err => {
            //     console.log(err);
            // });
        } catch {
            setError('Login failed. Please check your information and try again.')
        }
        // console.log("submit happened");
        // console.log({ email: emailInput.current.value, password: passwordInput.current.value});
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
                            <button type="submit" className="btn btn-success btn-block">Login</button>
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

export default LoginForm;