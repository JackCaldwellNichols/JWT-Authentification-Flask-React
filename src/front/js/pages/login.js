import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal, Button } from 'react-bootstrap'
import ModalTitle from 'react-bootstrap/ModalTitle';
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/login.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const history = useNavigate()

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleClick = () =>{
		if(email && password){
			actions.login(email, password).then((resp) => {
				if(resp){
					history("/private")
				}
			})
		};

	const handleError = () => {
		alert("Please enter your user name and password")
	}


	return (
		<div className="text-center">
		<div className="login">
			<h1>Login</h1>
			<input type="text" placeholder="email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
				<input type="password" placeholder="password" value = {password} onChange={(e) => setPassword(e.target.value)} required/>
				{email && password  ? (
				<button className="btn btn-primary" 
				onClick={handleClick}> 
					Log in
				</button> ) : (	
				<button className="btn btn-primary" 
				onClick={handleError} >
					Log in
				</button>
				)}
				<p className="p-2">Don't have an account?</p>
				<Link to="/signup">
					<button className="btn btn-primary">Click here</button>
				</Link>
		</div>		

			
		</div>
		
	);

};

