import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";


export const Home = () => {
	const { store, actions } = useContext(Context);


	return (
		<div className="text-center mt-5">
			<h1>Hello! This is the home page.</h1>

			<div>To log in again, 
				<Link to="/login"> 
					<button className="btn btn-link">Click here</button>
				</Link>
			</div>
		</div>
	);
};
