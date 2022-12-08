import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import "../../styles/signup.css";

import { Context } from "../store/appContext";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")
	const history = useNavigate()

	const handleClick = () =>{
		actions.signUp(email, password);
			history("/login")
	}

	const handleError = () => {
		alert("Email or password cannot be left blank")
	}

	return (
		<div className="container">
		<div className="signup">
			<h1>Sign Up Here</h1>
			<input type="email" placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
			<input type="password" placeholder="Password" password={password} onChange={(e) => setPassword(e.target.value)} required={true} minLength={2}/>
			{email && password ? (
			<button className="btn btn-primary" onClick={handleClick}>Sign up</button>) : (<button className="btn btn-primary" onClick={handleError}>Sign up</button>)}
		</div>
		</div>
		
	);
};
