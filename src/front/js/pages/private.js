import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/private.css";

export const Private = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const history = useNavigate()
	

	useEffect(() => {	
	if(store.token){actions.getMessage()}

	}, [store.token]
	)

	return (
		<div className="text-center">
			{
			store.token ? (
			<div>		
				<h1>This is your private zone</h1>
				<div className="alert">
					{store.message}
				</div>
			</div>
			) : (
				<h1>You have logged out</h1>
			) }
		</div>
	);
};

Private.propTypes = {
	match: PropTypes.object
};
