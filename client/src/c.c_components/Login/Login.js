import React from "react";
import "../../stylesheets/App.css";
import Button from "@mui/material/Button";

export default function Login({ setCurrentPage }) {
	function takemetomainpage() {
		setCurrentPage("care-provider");
	}
	return (
		<div className="login_screen">
			<div className="login_app_name">Coordinated Care</div>
			<br />
			<div className="motto">
				Revolutionizing the future of
				<br /> hospital process management
				<br /> systems
			</div>
			<Button className="login_button">Login</Button>
			<br />
			<Button className="request_account_button">Request Account</Button>
			<br />
			<button className="temp" onClick={takemetomainpage}>
				Continue as guest(temp)
			</button>
			<div className="credits">Proudly presented by Team Dodger Blue</div>
		</div>
	);
}
