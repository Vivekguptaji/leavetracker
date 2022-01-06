import React from 'react';
import { useState } from 'react';
import "./login.css";

function Login({ Login, error }) {
    const [details, setDetails] = useState({ username: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }
    return (
        <div className="loginContainer">
            <form onSubmit={submitHandler} data-testid="form" className='loginForm'>
                <div className="form-inner">
                    <h2>Login</h2>
                    {(error !== "") ? (<div className="error">{error}</div>) : ""}
                    <br />
                    <div className="form-group">
                        <label id="loginLabel" htmlFor="username">Username</label>
                        <input type="username" name="username" placeholder='Please enter username' id="username" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder='Please enter password' id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <div className="form-group"> 
                        <button className="userAddButton">Login</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Login
