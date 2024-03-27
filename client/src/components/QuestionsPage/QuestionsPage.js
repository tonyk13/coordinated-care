import React, { useState, useEffect, useRef } from "react";
import "./QuestionsPage.css";
import axios from "axios";
import UpvoteButton from "../VotingButtons/UpvoteButton";
import DownvoteButton from "../VotingButtons/DownvoteButton";
import Cookie from "js-cookie";

//questionBox
function QuestionBox({
	answerViewCount,
	questionTitle,
	questionSummary,
	qTagArray,
	askedByName,
	askedByTime,
	setCurrentPage,
	setSelectedQuestion,
	questions,
	tagsArray,
	questionsArray,
	isGuest,
}) {
	const tidToTagName = (tid) => {
		const tag = tagsArray.find((tag) => tag._id === tid);
		return tag ? tag.name : "";
	};
	const [questionVotes, setQuestionVotes] = useState(questions.votes);
	const userid = Cookie.get("userid");
	useEffect(() => {
		if (questions) {
			axios
				.get(`https://coordinated-care-cce88007d728.herokuapp.com/api/questions/${questions._id}/votes`)
				.then((response) => {
					setQuestionVotes(response.data.votes);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	});

	function handleQuestionUpvote() {
		axios
			.put(
				`https://coordinated-care-cce88007d728.herokuapp.com/api/questions/${questions._id}/users/${userid}/upvote`
			)
			.then((response) => {
				if (response.data.success) {
					setQuestionVotes(questionVotes + 1);
				} else {
					alert(response.data.message);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function handleQuestionDownvote() {
		axios
			.put(
				`https://coordinated-care-cce88007d728.herokuapp.com/api/questions/${questions._id}/users/${userid}/downvote`
			)
			.then((response) => {
				if (response.data.success) {
					setQuestionVotes(questionVotes - 1);
				} else {
					alert(response.data.message);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div className="questionBox" key={questions._id}>
			{isGuest ? (
				<div className="votesBox">
					<div id="voteError">*</div>
					<div className="questionVotes">{questionVotes} votes</div>
				</div>
			) : (
				<div className="votesBox">
					{<UpvoteButton handleUpvote={handleQuestionUpvote}></UpvoteButton>}
					<div className="questionVotes">{questionVotes} votes</div>
					{<DownvoteButton handleDownvote={handleQuestionDownvote}></DownvoteButton>}
				</div>
			)}
			<div className="titleTagWrapper">
				<p
					className="questionTitle"
					onClick={() => {
						const selectedQuestion = questionsArray.find((question) => question.title === questionTitle);
						setSelectedQuestion(selectedQuestion);
						selectedQuestion.views += 1;
						setCurrentPage("answersPage");
					}}
				>
					{questionTitle}
				</p>
				<p className="questionSummary">{questionSummary}</p>
				<div className="questionTags">
					{qTagArray.map((tid) => (
						<p key={questions._id + tid} className="qTag">
							{tidToTagName(tid)}
						</p>
					))}
				</div>
			</div>
			<div className="askedData">
				<p className="askedByName">{askedByName}</p>
				<p className="askedByTime">{askedByTime}</p>
			</div>
			<p className="answerViewCount">{answerViewCount}</p>
		</div>
	);
}

function formatDate(dateString) {
	const time = new Date(dateString);

	let monthString = "";
	switch (time.getMonth() + 1) {
		case 1:
			monthString = "Jan";
			break;
		case 2:
			monthString = "Feb";
			break;
		case 3:
			monthString = "Mar";
			break;
		case 4:
			monthString = "Apr";
			break;
		case 5:
			monthString = "May";
			break;
		case 6:
			monthString = "Jun";
			break;
		case 7:
			monthString = "Jul";
			break;
		case 8:
			monthString = "Aug";
			break;
		case 9:
			monthString = "Sep";
			break;
		case 10:
			monthString = "Oct";
			break;
		case 11:
			monthString = "Nov";
			break;
		case 12:
			monthString = "Dec";
			break;
		default:
			monthString = "";
			break;
	}

	const currentYear = new Date().getFullYear();
	let minuteString = time.getMinutes();
	let secondsString = time.getSeconds();
	let hourString = time.getHours();

	if (time.getMinutes() < 10) {
		minuteString = `0${time.getMinutes()}`;
	}
	if (time.getSeconds() < 10) {
		secondsString = `0${time.getSeconds()}`;
	}
	if (time.getHours() < 10) {
		hourString = `0${time.getHours()}`;
	}

	const currentTime = new Date();
	const timeDifferenceInSeconds = Math.floor((currentTime - time) / 1000);

	if (timeDifferenceInSeconds < 60) {
		return `${timeDifferenceInSeconds} seconds ago`;
	} else if (time.getFullYear() < currentYear) {
		return `${monthString} ${time.getDate()}, ${time.getFullYear()} at ${hourString}:${minuteString}`;
	} else if (time.getDate() > currentTime.getDate() && time.getMonth() !== currentTime.getMonth()) {
		return `${monthString} ${time.getDate()}, at ${hourString}:${minuteString}`;
	} else if (currentTime.getHours() - time.getHours() !== 0) {
		return `${Math.abs(currentTime.getHours() - time.getHours())} hours ago`;
	} else if (currentTime.getMinutes() - time.getMinutes() !== 0) {
		return `${currentTime.getMinutes() - time.getMinutes()} minutes ago`;
	} else {
		return `${secondsString} seconds ago`;
	}
}

//getQuestionsBasedOnPageNumber
function getQuestionsBasedOnPageNumber(questions, questionPageNumber, setQuestionPageNumber) {
	const questionPageSize = 5;
	let startIndex = (questionPageNumber - 1) * questionPageSize;
	let endIndex = startIndex + questionPageSize;
	if (startIndex > questions.length) {
		startIndex = 0;
		endIndex = 4;
		setQuestionPageNumber(1);
	}
	if (endIndex > questions.length) {
		endIndex = questions.length;
	}

	let questionsBasedOnPageNumber = [...questions].slice(startIndex, endIndex);
	return questionsBasedOnPageNumber;
}
//All Questions
function renderAllQuestions(
	questions,
	setCurrentPage,
	setSelectedQuestion,
	tagsArray,
	questionPageNumber,
	setQuestionPageNumber,
	isGuest
) {
	questions.sort((x, y) => new Date(y.ask_date_time) - new Date(x.ask_date_time));
	let questionsBasedOnPageNumber = getQuestionsBasedOnPageNumber(
		questions,
		questionPageNumber,
		setQuestionPageNumber
	);

	return questionsBasedOnPageNumber.map((question) => (
		<QuestionBox
			key={question._id}
			answerViewCount={`${question.answers.length} answers ${question.views} views`}
			questionTitle={question.title}
			questionSummary={question.summary}
			qTagArray={question.tags}
			askedByName={question.asked_by}
			askedByTime={`asked ${formatDate(question.ask_date_time)}`}
			questions={question}
			setCurrentPage={setCurrentPage}
			setSelectedQuestion={setSelectedQuestion}
			tagsArray={tagsArray}
			questionsArray={questions}
			isGuest={isGuest}
		/>
	));
}

//getQuestionFromAnswer
function getQuestionfromAnswer(questionsArray, answerID) {
	for (const q of questionsArray) {
		for (const a of q.answers) {
			if (a === answerID) {
				return q;
			}
		}
	}
	return null;
}

function activeSort(questionsArray, answersArray) {
	let returnArray = [];

	const activeSortTempArray = answersArray.sort((a, b) => new Date(b.ans_date_time) - new Date(a.ans_date_time));

	for (const answer of activeSortTempArray) {
		const question = getQuestionfromAnswer(questionsArray, answer._id);
		if (question && !returnArray.includes(question)) {
			returnArray.push(question);
		}
	}
	return returnArray;
}

//Render Active Questions
function renderActiveQuestions(
	questions,
	answers,
	setCurrentPage,
	setSelectedQuestion,
	tagsArray,
	questionPageNumber,
	setQuestionPageNumber,
	isGuest
) {
	let activeQuestions = activeSort(questions, answers);
	let questionsBasedOnPageNumber = getQuestionsBasedOnPageNumber(
		activeQuestions,
		questionPageNumber,
		setQuestionPageNumber
	);
	return questionsBasedOnPageNumber.map((question) => (
		<QuestionBox
			key={question.id}
			answerViewCount={`${question.answers.length} answers ${question.views} views`}
			questionTitle={question.title}
			questionSummary={question.summary}
			qTagArray={question.tags}
			askedByName={question.asked_by}
			askedByTime={`asked ${formatDate(question.ask_date_time)}`}
			questions={question}
			setCurrentPage={setCurrentPage}
			setSelectedQuestion={setSelectedQuestion}
			tagsArray={tagsArray}
			isGuest={isGuest}
		/>
	));
}

//Render Unanswered Questions
function renderUnansweredQuestions(
	questions,
	setCurrentPage,
	setSelectedQuestion,
	tagsArray,
	questionPageNumber,
	setQuestionPageNumber,
	isGuest
) {
	questions.sort((x, y) => new Date(y.ask_date_time) - new Date(x.ask_date_time));

	let unansweredQuestions = questions.filter((question) => question.answers.length === 0);

	console.log(unansweredQuestions);

	if (unansweredQuestions.length === 0) {
		return "No Questions Found";
	}

	let questionsBasedOnPageNumber = getQuestionsBasedOnPageNumber(
		unansweredQuestions,
		questionPageNumber,
		setQuestionPageNumber
	);
	return questionsBasedOnPageNumber.map((question) => (
		<QuestionBox
			key={question.id}
			answerViewCount={`${question.answers.length} answers ${question.views} views`}
			questionTitle={question.title}
			questionSummary={question.summary}
			qTagArray={question.tags}
			askedByName={question.asked_by}
			askedByTime={`asked ${formatDate(question.ask_date_time)}`}
			questions={question}
			setCurrentPage={setCurrentPage}
			setSelectedQuestion={setSelectedQuestion}
			tagsArray={tagsArray}
			questionsArray={unansweredQuestions}
			isGuest={isGuest}
		/>
	));
}

function renderSearchResults(
	questions,
	setCurrentPage,
	setSelectedQuestion,
	searchResultsQuestionArrayRef,
	tagsArray,
	questionPageNumber,
	setQuestionPageNumber,
	isGuest
) {
	let questionsBasedOnPageNumber = getQuestionsBasedOnPageNumber(
		searchResultsQuestionArrayRef.current,
		questionPageNumber,
		setQuestionPageNumber
	);

	return questionsBasedOnPageNumber.map((question) => (
		<QuestionBox
			key={question.id}
			answerViewCount={`${question.answers.length} answers ${question.views} views`}
			questionTitle={question.title}
			questionSummary={question.summary}
			qTagArray={question.tags}
			askedByName={question.asked_by}
			askedByTime={`asked ${formatDate(question.ask_date_time)}`}
			questions={question}
			setCurrentPage={setCurrentPage}
			setSelectedQuestion={setSelectedQuestion}
			tagsArray={tagsArray}
			questionsArray={questionsBasedOnPageNumber}
			isGuest={isGuest}
		/>
	));
}

function QuestionsPage({
	questions,
	setCurrentPage,
	setSelectedQuestion,
	currentSearch,
	setSearch,
	tags,
	databaseUpdateTrigger,
	isGuest,
}) {
	/*Convert questions and tags into an Array*/
	const [questionsArray, setQuestionsArray] = useState([]);
	useEffect(() => {
		if (questions !== null) {
			setQuestionsArray(questions);
		}
	}, [questions, databaseUpdateTrigger]);

	const [tagsArray, setTagsArray] = useState([]);
	useEffect(() => {
		if (tags !== null) {
			setTagsArray(tags);
		}
	}, [tags, databaseUpdateTrigger]);

	const [sort, setSort] = useState("Newest");
	const [noq, setNoq] = useState(questionsArray.length);
	const [questionPageNumber, setQuestionPageNumber] = useState(1);

	useEffect(() => {
		setNoq(questionsArray.length);
	}, [questionsArray]);

	//Creating Answers Master List
	const [answersArray, setAnswersArray] = useState([]);

	useEffect(() => {
		const fetchAnswers = async () => {
			try {
				let allAnswers = [];
				for (const question of questionsArray) {
					const response = await axios.get(
						`https://coordinated-care-cce88007d728.herokuapp.com/api/questions/${question._id}/answers`
					);
					const answers = response.data;

					allAnswers = allAnswers.concat(answers);
				}
				setAnswersArray(allAnswers);
			} catch (error) {
				console.error("Error fetching answers:", error);
			}
		};
		fetchAnswers();
	}, [questionsArray]);

	/*Display Question Order Types*/
	const displayAllQuestions = () => {
		setSort("Newest");
		setNoq(questionsArray.length);
		setQuestionPageNumber(1);
	};

	const displayActiveQuestions = () => {
		setSort("Active");
		setNoq(activeSort(questionsArray, answersArray).length);
		setQuestionPageNumber(1);
	};

	const displayUnansweredQuestions = () => {
		setSort("Unanswered");
		setNoq(questionsArray.filter((question) => question.answers.length === 0).length);
		setQuestionPageNumber(1);
	};

	const incrementQuestionPageNumber = () => {
		if (!(questions.length % 5 === 0 && Math.floor(questions.length / 5) === questionPageNumber)) {
			setQuestionPageNumber(questionPageNumber + 1);
		}
	};

	const decrementQuestionPageNumber = () => {
		if (questionPageNumber !== 1) {
			setQuestionPageNumber(questionPageNumber - 1);
		}
	};

	//Searching Functionality
	const keywordSearchArray = useRef([]);
	const tagSearchArray = useRef([]);
	const searchResultsQuestionArrayRef = useRef([]);

	useEffect(() => {
		if (currentSearch !== "") {
			parseSearch(currentSearch);
			searchResultsQuestionArrayRef.current = keywordTagArraysToSearchArray(
				keywordSearchArray.current,
				tagSearchArray.current
			);
			setSort("Search");
			setQuestionPageNumber(1);
			setNoq(searchResultsQuestionArrayRef.current.length);
		} else {
			displayAllQuestions();
		}
	}, [currentSearch]);

	//Search Auxiliary Functions
	function splitTextAndLowercase(text) {
		text = text.replace(/(\S)(\[|\])/g, "$1 $2").replace(/(\[|\])(\S)/g, "$1 $2");
		const regex = /(\[[^\]]+\])|\S+/g;
		const matches = text.match(regex) || [];
		let regexMatches = [];
		for (let i = 0; i < matches.length; i++) {
			if (matches[i].startsWith("[") && matches[i].endsWith("]")) {
				const wordsInBrackets = matches[i].slice(1, -1).trim().split(/\s+/);
				const processedBracketedWords = wordsInBrackets.map((word) => `[${word.toLowerCase()}]`);
				regexMatches = regexMatches.concat(processedBracketedWords);
			} else {
				regexMatches.push(matches[i].toLowerCase());
			}
		}
		return regexMatches;
	}

	function findSearchWordInText(searchWord, text) {
		const wordsArray = text.split(/\s+/);
		const wordExists = wordsArray.includes(searchWord);
		return wordExists;
	}

	function parseSearch(searchString) {
		// Update the searchString variable
		searchString = searchString.toLowerCase();
		let keywordSearchArrayTemp = [];
		let tagSearchArrayTemp = [];

		let searchStringArray = splitTextAndLowercase(searchString);

		searchStringArray.forEach((word) => {
			if (word.startsWith("[") && word.endsWith("]")) {
				tagSearchArrayTemp.push(word.substring(1, word.length - 1));
			} else {
				keywordSearchArrayTemp.push(word);
			}
		});
		keywordSearchArray.current = keywordSearchArrayTemp;
		tagSearchArray.current = tagSearchArrayTemp;
	}

	function keywordTagArraysToSearchArray(keywordSearchArray, tagSearchArray) {
		let searchResultsQuestionArray = [];
		keywordSearchArray = keywordSearchArray.filter((word) => word !== "");
		for (const searchWord of keywordSearchArray) {
			for (const question of questionsArray) {
				if (
					findSearchWordInText(searchWord, question.title.toLowerCase()) ||
					findSearchWordInText(searchWord, question.text.toLowerCase())
				) {
					searchResultsQuestionArray.push(question);
				}
			}
		}

		//Search Tag Query
		for (const question of questionsArray) {
			for (const tagWord of tagSearchArray) {
				for (const tagsPointer of question.tags) {
					const tagsNamePointer = tagsArray.find((tag) => tag._id === tagsPointer).name;
					if (tagsNamePointer === tagWord) {
						searchResultsQuestionArray.push(question);
					}
				}
			}
		}

		//Removing Dupes
		let uniqueSearchResultsSet = new Set(searchResultsQuestionArray);
		let uniqueSearchResultsQuestionArray = Array.from(uniqueSearchResultsSet);
		return uniqueSearchResultsQuestionArray;
	}

	//Ask Question Page
	const loadAskQuestionPage = () => {
		setCurrentPage("askQuestionPage");
	};

	return (
		<div id="questionsPage">
			<div id="questionsPageHeader">
				<div id="qphRow1">
					<div id="qphTitle">
						{sort === "Newest" && "All Questions"}
						{sort === "Active" && "Active Questions"}
						{sort === "Unanswered" && "Unanswered Questions"}
						{sort === "Search" && "Search Results"}
					</div>

					{isGuest ? (
						<div id="mustBeLoggedInText">*Must Be Logged In to Ask a Question or Vote</div>
					) : (
						<button type="button" className="askQuestionButton" onClick={loadAskQuestionPage}>
							Ask Question
						</button>
					)}
				</div>

				<div id="qphRow2">
					<div id="numberOfQuestions">
						{noq} {noq === 1 ? "Question" : "Questions"}
					</div>
					<div id="questionsStatusButtons">
						<button onClick={displayAllQuestions}>Newest</button>
						<button onClick={displayActiveQuestions}>Active</button>
						<button onClick={displayUnansweredQuestions}>Unanswered</button>
					</div>
				</div>
			</div>

			<div id="questionsWrapper">
				{sort === "Newest" &&
					renderAllQuestions(
						questionsArray,
						setCurrentPage,
						setSelectedQuestion,
						tagsArray,
						questionPageNumber,
						setQuestionPageNumber,
						isGuest
					)}

				{sort === "Active" &&
					renderActiveQuestions(
						questionsArray,
						answersArray,
						setCurrentPage,
						setSelectedQuestion,
						tagsArray,
						questionPageNumber,
						setQuestionPageNumber,
						isGuest
					)}
				{sort === "Unanswered" &&
					renderUnansweredQuestions(
						questionsArray,
						setCurrentPage,
						setSelectedQuestion,
						tagsArray,
						questionPageNumber,
						setQuestionPageNumber,
						isGuest
					)}
				{sort === "Search" &&
					renderSearchResults(
						questionsArray,
						setCurrentPage,
						setSelectedQuestion,
						searchResultsQuestionArrayRef,
						tagsArray,
						questionPageNumber,
						setQuestionPageNumber,
						isGuest
					)}
			</div>
			<div id="questionPageSelector">
				<button id="nextQuestionPageSelector" onClick={decrementQuestionPageNumber}>
					&#8592;
				</button>
				<div id="questionPageNumber">Prev | {questionPageNumber} | Next</div>
				<button id="prevQuestionPageSelector" onClick={incrementQuestionPageNumber}>
					&#8594;
				</button>
			</div>
		</div>
	);
}

export default QuestionsPage;
