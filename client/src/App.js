import { React, useState, useEffect } from "react";

import Care_provider from "./c.c_components/Care_Provider/Care_provider.js";
import Login from "./c.c_components/Login/Login.js";
import Request_account from "./c.c_components/Request_Account/Request_account.js";
import Admin from "./c.c_components/Administrator/Admin.js";

import axios from "axios";
import Cookie from "js-cookie";
import Equipment from "./c.c_components/Care_Provider/Equipment/Equipment.js";
import EditEquipment from "./c.c_components/Care_Provider/Equipment/EditEquipment.js";
import DiscussionBoard from "./c.c_components/Discussion_Board/Discussion_Board.js";
import PasswordReset from "./c.c_components/PasswordReset.js";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
	const [currentPage, setCurrentPage] = useState("login");
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const [token, setToken] = useState('');

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
		};

		const handleOffline = () => {
			setIsOnline(false);
		};
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());
	
		if (params.token) {
			setToken(params.token);
			setCurrentPage('password-reset');
			
		}

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	const renderCurrentPage = () => {
		switch (currentPage) {
			case "admin":
				return <Admin />;
			case "care-provider":
				return <Care_provider setCurrentPage={setCurrentPage} />;
			case "login":
				return <Login setCurrentPage={setCurrentPage} />;
			case "request-account":
				return <Request_account setCurrentPage={setCurrentPage} />;
			case "Equipment":
				return <Equipment setCurrentPage={setCurrentPage} />;
			case "EditEquipment":
				return <EditEquipment setCurrentPage={setCurrentPage} />;
			case "Discussion Board":
				return <DiscussionBoard setCurrentPage={setCurrentPage} />;
			case "password-reset":
					return <PasswordReset setCurrentPage={setCurrentPage} token = {token} />;
			default:
				return <div>Page not found</div>;
		}
	};

	return(
		<div className="app">
 			{renderCurrentPage()}
		</div>
	);
}

export default App;
