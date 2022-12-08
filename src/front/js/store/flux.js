import { useNavigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromLocalStorageStore: () => {
				const token = localStorage.getItem("token")
				console.log("App finished loading")
				if(token && token != "" && token != undefined) setStore({token: token})
			},

			logout: () => {
				const token = localStorage.removeItem("token")
				console.log("App finished loading")
				setStore({token: null, user: null})
		
			},

			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
				
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				try{
				const resp = await fetch("https://3001-4geeksacade-reactflaskh-7icaqquwgz2.ws-eu77.gitpod.io/api/token", opts)
				if(resp.status !== 200) {
					alert("Invalid user"), 403
					return false
				}

				const data = await resp.json()
				console.log("backend", data)
				localStorage.setItem("token", data.access_token)
				setStore({token: data.access_token})
				if(resp.status == 200){
					
					return true
					}
				}
				catch (error){
					console.log("there has been an error")
					return false
				}
			},

			signUp: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				try{
				const resp = await fetch("https://3001-4geeksacade-reactflaskh-7icaqquwgz2.ws-eu77.gitpod.io/api/user", opts)
				if(email == "" || password == "") {
					alert ("Please enter your details")
					return false
				}
				const data = await resp.json()	
				}
				catch (error){
					console.log("there has been an error")
				}
			},

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}
				try{
					// fetching data from the backend
					const resp = await fetch("https://3001-4geeksacade-reactflaskh-7icaqquwgz2.ws-eu77.gitpod.io/api/userinfo", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
