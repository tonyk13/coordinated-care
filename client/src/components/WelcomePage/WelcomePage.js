import { React, useState } from "react";
import axios from "axios";
import "./WelcomePage.css";
import Cookie from "js-cookie";

function WelcomePage({ setCurrentPage, setIsLoggedIn, isGuest, setIsGuest, isOnline }) {
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [isCreatingAccount, setIsCreatingAccount] = useState(false);

	if (!isOnline) {
		return (
			<div id="welcomePage">
				<h1>Coordinated Care</h1>
				<h3>You are currently offline. Please connect to the internet to continue.</h3>
			</div>
		);
	}

	if (!isLoggingIn && !isCreatingAccount) {
		return (
			<div id="welcomePage">
				<h1>Coordinated Care</h1>
				<h2></h2>
				<WelcomePageBox
					isLoggingIn={isLoggingIn}
					setIsLoggingIn={setIsLoggingIn}
					setCurrentPage={setCurrentPage}
					setIsLoggedIn={setIsLoggedIn}
					isCreatingAccount={isCreatingAccount}
					setIsCreatingAccount={setIsCreatingAccount}
					isGuest={isGuest}
					setIsGuest={setIsGuest}
				></WelcomePageBox>
			</div>
		);
	} else if (isLoggingIn) {
		return (
			<div id="welcomePage">
				<h1>Coordinated Care</h1>
				<h2>Log in</h2>
				<WelcomePageBox
					isLoggingIn={isLoggingIn}
					setIsLoggingIn={setIsLoggingIn}
					setCurrentPage={setCurrentPage}
					setIsLoggedIn={setIsLoggedIn}
					isCreatingAccount={isCreatingAccount}
					setIsCreatingAccount={setIsCreatingAccount}
					isGuest={isGuest}
					setIsGuest={setIsGuest}
				></WelcomePageBox>
			</div>
		);
	} else if (isCreatingAccount) {
		return (
			<div id="welcomePage">
				<h1>Coordinated Care</h1>
				<h2>Create Account</h2>
				<WelcomePageBox
					isLoggingIn={isLoggingIn}
					setIsLoggingIn={setIsLoggingIn}
					setCurrentPage={setCurrentPage}
					setIsLoggedIn={setIsLoggedIn}
					isCreatingAccount={isCreatingAccount}
					setIsCreatingAccount={setIsCreatingAccount}
					isGuest={isGuest}
					setIsGuest={setIsGuest}
				></WelcomePageBox>
			</div>
		);
	}
}

function WelcomePageBox({
	isLoggingIn,
	setIsLoggingIn,
	setCurrentPage,
	setIsLoggedIn,
	isCreatingAccount,
	setIsCreatingAccount,
	isGuest,
	setIsGuest,
}) {
	function handleLoginClick() {
		setIsLoggingIn(true);
		console.log("Logging in...");
	}

	function handleCreateAccountClick() {
		setIsCreatingAccount(true);
		console.log("Creating account...");
	}

	function handleContinueAsGuestClick() {
		setCurrentPage("questionsPage");
		setIsLoggedIn(false);
		setIsGuest(true);
		Cookie.set("auth", "GUEST", { expires: 7 });
		console.log("Continuing as guest...");
	}

	if (isLoggingIn) {
		return (
			<div id="welcomePageBox">
				<LoginForm
					setIsLoggingIn={setIsLoggingIn}
					setIsLoggedIn={setIsLoggedIn}
					setCurrentPage={setCurrentPage}
				></LoginForm>
			</div>
		);
	} else if (isCreatingAccount) {
		return (
			<div id="welcomePageBox">
				<CreateAccountForm
					setIsLoggingIn={setIsLoggingIn}
					setIsCreatingAccount={setIsCreatingAccount}
				></CreateAccountForm>
			</div>
		);
	} else {
		return (
			<div id="welcomePageBox">
				<LoginButton handleLoginClick={handleLoginClick}></LoginButton>
				<CreateAccountButton handleCreateAccountClick={handleCreateAccountClick}></CreateAccountButton>
				<div id="welcomePageBoxText">Just taking a look around?</div>
				<GuestButton handleContinueAsGuestClick={handleContinueAsGuestClick}></GuestButton>
			</div>
		);
	}
}

function LoginForm({ setIsLoggingIn, setIsLoggedIn, setCurrentPage }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		setEmailError("");
		setPasswordError("");

		if (email === "") {
			setEmailError("Email field cannot be empty");
		}

		if (password === "") {
			setPasswordError("Password field cannot be empty");
		}

		try {
			const response = await axios.post("https://coordinated-care-cce88007d728.herokuapp.com/api/login", {
				email,
				password,
			});

			const data = response.data;

			if (!data.success) {
				if (data.message === "There is no account registered with this email") {
					setEmailError("There is no account registered with this email");
				} else if (data.message === "Incorrect password") {
					setPasswordError("Incorrect password");
				}
			} else {
				setEmail("");
				setPassword("");

				setIsLoggingIn(false);
				setIsLoggedIn(true);
				setCurrentPage("questionsPage");

				console.log("Successfully logged in");

				Cookie.set("auth", data.message, { expires: 7 });
				Cookie.set("userid", data._id, { expires: 7 });

				return;
			}
		} catch (error) {
			console.error("Login failed:", error.message);
		}
	};

	return (
		<div className="loginForm">
			<form onSubmit={handleSubmit}>
				<div id="emailDiv">
					<label
						htmlFor="email"
						style={{
							color: "#fff",
							display: "block",
							fontFamily: "sans-serif",
							fontSize: "12px",
						}}
					>
						Enter your email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						required
					/>
					<label
						htmlFor="email"
						className="emailError"
						style={{
							display: emailError !== "" ? "block" : "none",
						}}
					>
						{emailError}
					</label>
				</div>
				<div id="passwordDiv">
					<label
						htmlFor="password"
						style={{
							color: "#fff",
							display: "block",
							fontFamily: "sans-serif",
							fontSize: "12px",
						}}
					>
						Enter your password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required
					/>
					<label
						htmlFor="password"
						className="passwordError"
						style={{
							display: passwordError !== "" ? "block" : "none",
						}}
					>
						{passwordError}
					</label>
				</div>
				<span>
					<input type="submit" id="loginButton" value="Log in" onClick={handleSubmit} />
				</span>
				<span>
					<input type="button" id="goBackButton" value="Go Back" onClick={() => setIsLoggingIn(false)} />
				</span>
			</form>
		</div>
	);
}

function LoginButton({ handleLoginClick }) {
	return (
		<div className="loginButton" onClick={handleLoginClick}>
			Log in
		</div>
	);
}

function CreateAccountForm({ setIsLoggingIn, setIsCreatingAccount }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVerification, setPasswordVerification] = useState("");

	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [passwordVerificationError, setPasswordVerificationError] = useState("");

	function validateEmail(email) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		setUsernameError("");
		setEmailError("");
		setPasswordError("");
		setPasswordVerificationError("");

		if (username === "") {
			setUsernameError("Username is required");
		}

		if (email === "") {
			setEmailError("Email is required");
		} else if (!validateEmail(email)) {
			setEmailError("Invalid email format");
		}

		if (password === "") {
			setPasswordError("Password is required");
		}

		if (password.includes(username) && username !== "") {
			console.log("Username: ", username);
			console.log("Password: ", password);
			setPasswordError("Password cannot contain username");
			console.log("Password error: ", passwordError);
		}

		if (password.includes(email) && email !== "") {
			setPasswordError("Password cannot contain email");
		}

		if (passwordVerification === "") {
			setPasswordVerificationError("Password verification is required");
		} else if (password !== passwordVerification) {
			setPasswordVerificationError("Passwords do not match");
		}

		const passwordHash = password;
		const passwordHashVerification = passwordVerification;

		try {
			const response = await axios.post("https://coordinated-care-cce88007d728.herokuapp.com/api/createaccount", {
				email,
				username,
				passwordHash,
				passwordHashVerification,
			});

			const data = response.data;

			if (!data.success) {
				if (data.message === "Email is required") {
					setEmailError(data.message);
				} else if (data.message === "Password is required") {
					setPasswordError(data.message);
				} else if (data.message === "Password cannot contain username or email") {
					setPasswordError(data.message);
				} else if (data.message === "Passwords do not match") {
					setPasswordVerificationError(data.message);
				} else if (data.message === "User account with this email already exists") {
					setEmailError(data.message);
				}
			} else {
				setUsername("");
				setEmail("");
				setPassword("");
				setPasswordVerification("");

				setIsCreatingAccount(false);
				setIsLoggingIn(true);
			}
		} catch (error) {
			console.error("Error creating account:", error);
		}
	};

	return (
		<div className="createAccountForm">
			<form onSubmit={handleSubmit}>
				<div id="usernameDiv">
					<label
						htmlFor="username"
						style={{
							color: "#fff",
							display: "block",
							fontFamily: "sans-serif",
							fontSize: "12px",
						}}
					>
						Enter your username
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
						required
					/>
					<label
						htmlFor="username"
						className="usernameError"
						style={{
							display: usernameError !== "" ? "block" : "none",
						}}
					>
						{usernameError}
					</label>
				</div>
				<div id="emailDiv">
					<label
						htmlFor="email"
						style={{
							color: "#fff",
							display: "block",
							fontFamily: "sans-serif",
							fontSize: "12px",
						}}
					>
						Enter your email
					</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						required
					/>
					<label
						htmlFor="email"
						className="emailError"
						style={{
							display: emailError !== "" ? "block" : "none",
						}}
					>
						{emailError}
					</label>
				</div>
				<div id="passwordDiv">
					<label
						htmlFor="password"
						style={{
							color: "#fff",
							display: "block",
							fontFamily: "sans-serif",
							fontSize: "12px",
						}}
					>
						Enter your password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required
					/>
					<label
						htmlFor="password"
						className="passwordError"
						style={{
							display: passwordError !== "" ? "block" : "none",
						}}
					>
						{passwordError}
					</label>
				</div>
				<div id="passwordVerificationDiv">
					<label
						htmlFor="passwordVerification"
						style={{
							color: "#fff",
							display: "block",
							fontFamily: "sans-serif",
							fontSize: "12px",
						}}
					>
						Verify your password
					</label>
					<input
						type="password"
						id="passwordVerification"
						value={passwordVerification}
						onChange={(e) => setPasswordVerification(e.target.value)}
						placeholder="Verify your password"
						required
					/>
					<label
						htmlFor="passwordVerification"
						className="passwordVerificationError"
						style={{
							display: passwordVerificationError !== "" ? "block" : "none",
						}}
					>
						{passwordVerificationError}
					</label>
				</div>
				<span>
					<input type="submit" id="loginButton" value="Create Account" onClick={handleSubmit} />
				</span>
				<span>
					<input
						type="button"
						id="goBackButton"
						value="Go Back"
						onClick={() => setIsCreatingAccount(false)}
					/>
				</span>
			</form>
		</div>
	);
}

function CreateAccountButton({ handleCreateAccountClick }) {
	return (
		<div className="signupButton" onClick={handleCreateAccountClick}>
			Create Account
		</div>
	);
}

function GuestButton({ handleContinueAsGuestClick }) {
	return (
		<div className="guestButton" onClick={handleContinueAsGuestClick}>
			Continue as Guest
		</div>
	);
}

export default WelcomePage;
