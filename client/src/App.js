import { React, useState, useEffect } from "react";

import WelcomePage from "./components/WelcomePage/WelcomePage.js";
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

function App() {
	const [currentPage, setCurrentPage] = useState("login");

	const [databaseUpdateTrigger, setDataBaseUpdateTrigger] = useState(0);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isGuest, setIsGuest] = useState(false);
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const [searchTrigger, setSearchTrigger] = useState("");
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

	useEffect(() => {
		const user = Cookie.get("auth");
		if (user) {
			console.log("THERE IS A USER IN THE COOKIE:", user);
			if (user !== "GUEST") {
				setIsLoggedIn(true);
			} else {
				setIsGuest(true);
			}
			setCurrentPage("questionsPage");
		} else {
			console.log("NO USER IN THE COOKIE");
		}
	}, []);

	/*
	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get("https://coordinated-care-cce88007d728.herokuapp.com/api/questions");
				setQuestions(Object.values(response.data));
			} catch (error) {
				console.error("Error fetching data:", error);
				if (isLoggedIn) {
					alert("Error Fetching Questions");
				}
			}
		};

		fetchQuestions();
	}, [databaseUpdateTrigger]);
	*/

	const handleLogout = async () => {
		if (!isGuest) {
			try {
				const response = await axios.post("https://coordinated-care-cce88007d728.herokuapp.com/api/logout", null, {
					withCredentials: true,
				});
				console.log(response.data);
				if (response.data.success) {
					Cookie.remove("auth");
					Cookie.remove("userid");
					setIsLoggedIn(false);
					setCurrentPage("welcomePage");
					console.log("Logged out successfully!");
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			setIsGuest(false);
			Cookie.remove("auth");
			setCurrentPage("welcomePage");
		}
	};

	useEffect(() => {
		if (searchTrigger !== "") {
			setCurrentPage("singleTagPage");
		}
		console.log(searchTrigger);
	}, []);

	const renderCurrentPage = () => {
		//setSearchTrigger("");
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

		/*
		if (currentPage === "questionsPage") {
			return (
				<QuestionsPage
					setSelectedQuestion={setSelectedQuestion}
					questions={questions}
					setCurrentPage={setCurrentPage}
					currentSearch={currentSearch}
					setSearch={setSearch}
					tags={tags}
					databaseUpdateTrigger={databaseUpdateTrigger}
					isGuest={isGuest}
				/>
			);
		} else if (currentPage === "tagsPage") {
			return (
				<TagsPage
					questions={questions}
					tags={tags}
					setCurrentPage={setCurrentPage}
					currentSearch={currentSearch}
					setSearch={setSearch}
					databaseUpdateTrigger={databaseUpdateTrigger}
					currentPage={currentPage}
					setSearchTrigger={setSearchTrigger}
				/>
			);
		} else if (currentPage === "askQuestionPage") {
			return (
				<AskQuestionPage
					setCurrentPage={setCurrentPage}
					setDataBaseUpdateTrigger={setDataBaseUpdateTrigger}
					tags={tags}
				/>
			);
		} else if (currentPage === "newAnswerPage") {
			return (
				<NewAnswerPage
					selectedQuestion={selectedQuestion}
					setCurrentPage={setCurrentPage}
					setDataBaseUpdateTrigger={setDataBaseUpdateTrigger}
				/>
			);
		} else if (currentPage === "answersPage") {
			return (
				<AnswersPage
					selectedQuestion={selectedQuestion}
					setCurrentPage={setCurrentPage}
					setDataBaseUpdateTrigger={setDataBaseUpdateTrigger}
					tags={tags}
					isGuest={isGuest}
				/>
			);
		} else if (currentPage === "userProfilePage") {
			return (
				<UserProfilePage
					isGuest={isGuest}
					setCurrentPage={setCurrentPage}
					setSearchTrigger={setSearchTrigger}
					EditQuestionPage={EditQuestionPage}
					setDataBaseUpdateTrigger={setDataBaseUpdateTrigger}
					tags={tags}
					setSelectedQuestion={setSelectedQuestion}
				/>
			);
		} else if (currentPage === "singleTagPage") {
			return (
				<SingleTagPage
					questions={questions}
					setCurrentPage={setCurrentPage}
					setSelectedQuestion={setSelectedQuestion}
					tags={tags}
					databaseUpdateTrigger={databaseUpdateTrigger}
					isGuest={isGuest}
					tagWord={searchTrigger}
				/>
			);
		}
		*/
	};

	/*
	return (
		<div className="app">
			{isOnline && (isLoggedIn || isGuest) ? (
				<div className="page">
					<h1> holder for Main Page </h1>
					
				</div>
			) : (
				
				<div className="content">
					<WelcomePage
						setCurrentPage={setCurrentPage}
						setIsLoggedIn={setIsLoggedIn}
						isGuest={isGuest}
						setIsGuest={setIsGuest}
						isOnline={isOnline}
					/>
				</div>
				
			)}
		</div>
	);
	*/
	return <div className="app">{renderCurrentPage()}</div>;
}

export default App;
