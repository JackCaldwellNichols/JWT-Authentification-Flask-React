import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const history = useNavigate()
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/home">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{store.token == null ? 
					<Link to="/login">
						<button className="btn btn-primary">Please log in</button>
					</Link>
					:
						<button onClick={() => actions.logout()}  className="btn btn-primary">Log out</button>
					}
				</div>
			</div>
		</nav>
	);
};
