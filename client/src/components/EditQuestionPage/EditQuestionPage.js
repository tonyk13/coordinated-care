import React, { useState, useEffect } from "react";
import "./EditQuestionPage.css";
import Cookie from "js-cookie";
import axios from "axios";

export default function EditQuestionPage({
	setCurrentPage,
	setDataBaseUpdateTrigger,
	tags,
	eqTitle,
	eqSummary,
	eqText,
	eqTags,
	eqid,
	toggleEditQuestionPage,
	isAdmin,
	adminViewUser,
}) {
	//PQ Title Handler
	const [pqNE1, setpqNE1] = useState(true);
	const [pqTitleText, setpqTitleText] = useState("");
	const handlepqTiteTextarea = (event) => {
		const updatepqTitleText = event.target.value.replace(/\n/g, "");
		setpqTitleText(updatepqTitleText);

		if (updatepqTitleText.replace(/\s/g, "") !== "") {
			setpqNE1(false);
		} else {
			setpqNE1(true);
		}
	};

	//PQ Summary Handler
	const [pqNE2, setpqNE2] = useState(true);
	const [pqSummaryText, setpqSummaryText] = useState("");
	const handlepqSummaryTextarea = (event) => {
		const updatepqSummaryText = event.target.value.replace(/\n/g, "");
		setpqSummaryText(updatepqSummaryText);

		if (updatepqSummaryText.replace(/\s/g, "") !== "") {
			setpqNE2(false);
		} else {
			setpqNE2(true);
		}
	};

	//PQ Text Handler
	const [pqNE3, setpqNE3] = useState(true);
	const [pqHLE1, setpqHLE1] = useState(false);
	const [pqQuestionText, setpqQuestionText] = useState("");

	const handlepqQuestionTextarea = (event) => {
		setpqQuestionText(event.target.value);
		if (pqQuestionText.replace(/[\s\n]/g, "") !== "") {
			setpqNE3(false);
		} else {
			setpqNE3(true);
		}

		//HyperLink Checking
		const hyperLinkRegex = /\[([^\]]*)\]\(([^)]*)\)/g;
		const hyperlinkMatches = [...pqQuestionText.matchAll(hyperLinkRegex)];
		let hasInvalidHyperlink = false;

		for (const hl of hyperlinkMatches) {
			let hlURL = hl[2];
			if (hlURL.trim() === "" || (!hlURL.startsWith("http://") && !hlURL.startsWith("https://"))) {
				hasInvalidHyperlink = true;
				break;
			}
		}
		setpqHLE1(hasInvalidHyperlink);
	};

	//PQ Tags Handler
	const [pqNE4, setpqNE4] = useState(true);
	const [pqTE1, setpqTE1] = useState(false);
	const [pqTagsText, setpqTagsText] = useState("");
	const [pqTagStringArray, setpqTagStringArray] = useState([eqTags]);

	function editQuestionValidTagsCheck(pqTagStringArray) {
		let ret = true;
		for (const tag of pqTagStringArray) {
			if (tag.length > 10 || pqTagStringArray.length > 5) {
				ret = false;
			}
		}
		return ret;
	}

	//Returns Array of tags, adds new tags if not in already and returns array of questions tag tids
	const [tagsArray, setTagsArray] = useState([]);
	useEffect(() => {
		if (tags !== null) {
			setTagsArray(tags);
		}
	}, [tags]);

	async function checkQuestionTags(tagStringArray, userid) {
		let returnArray = [];
		let uniqueTags = [...new Set(tagStringArray)];
		tagStringArray = uniqueTags.flatMap((innerArray) => innerArray);
		console.log(tagStringArray);
		for (const newTag of tagStringArray) {
			let addNewTag = true;
			for (const tag of tagsArray) {
				//console.log(tag.name)
				if (tag.name === newTag) {
					addNewTag = false;
					returnArray.push(tag._id);
				}
			}
			if (addNewTag) {
				let postTag = {
					name: newTag,
				};
				let postTagId = 0;
				try {
					const ptResponse = await axios.post(
						"https://coordinated-care-cce88007d728.herokuapp.com/api/tags",
						postTag,
						{
							headers: {
								"Content-Type": "application/json",
							},
						}
					);
					postTagId = ptResponse.data._id;
					const pqToUserResponse = await axios.post(
						`https://coordinated-care-cce88007d728.herokuapp.com/api/postTagToUser/${userid}/tags`,
						ptResponse.data
					);
				} catch (error) {
					console.error("Error:", error);
				}
				returnArray.push(postTagId);
			}
		}
		return returnArray;
	}

	const handlepqTagsTextarea = (event) => {
		const updatepqTagsText = event.target.value.replace(/\n/g, "");
		setpqTagsText(updatepqTagsText);
		setpqTagStringArray(updatepqTagsText.toLowerCase().trim().split(/\s+/));

		if (updatepqTagsText.replace(/\s/g, "") !== "") {
			setpqNE4(false);
		} else {
			setpqNE4(true);
		}

		if (!pqNE3) {
			if (editQuestionValidTagsCheck(pqTagStringArray)) {
				setpqTE1(false);
			} else {
				setpqTE1(true);
			}
		}
	};

	// Post Question Button
	const handlePostQuestionButton = async (event) => {
		try {
			event.preventDefault();

			if (!pqNE1 && !pqNE2 && !pqHLE1 && !pqNE3 && !pqTE1 && !pqNE4) {
				let userid = Cookie.get("userid");
				if (isAdmin) {
					userid = adminViewUser;
				}
				let pqTagArray = await checkQuestionTags(pqTagStringArray, userid);
				console.log(pqTagArray);
				let pqReputation = "";
				let pqUsername = "";

				try {
					const response = await axios.get(
						`https://coordinated-care-cce88007d728.herokuapp.com/api/getUsername/${userid}`
					);
					pqUsername = response.data.username;
				} catch (error) {
					console.error("Error fetching user reputation:", error);
				}

				// Post Question
				let postQuestion = {
					title: document.getElementById("pqTitle").value,
					summary: document.getElementById("pqSummary").value,
					text: document.getElementById("pqText").value,
					tags: pqTagArray,
				};

				// POST Question, POST Question to USER
				try {
					const pqResponse = await axios.put(
						`https://coordinated-care-cce88007d728.herokuapp.com/api/questions/${eqid}`,
						postQuestion,
						{
							headers: {
								"Content-Type": "application/json",
							},
						}
					);
				} catch (error) {
					console.error("Error:", error);
				}
				setCurrentPage("questionsPage");
				// Update trigger
				await handleUpdateTrigger();
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// Updated handleUpdateTrigger function
	const handleUpdateTrigger = async () => {
		return new Promise((resolve) => {
			setDataBaseUpdateTrigger((prev) => {
				setTimeout(() => {
					resolve(); // Resolve the promise after the timeout
				}, 1000);
				return prev + 1;
			});
		});
	};

	const handleDeleteQuestionButton = async (event) => {
		let userid = Cookie.get("userid");
		if (isAdmin) {
			userid = adminViewUser;
		}
		try {
			const pqDeleteformUser = await axios.delete(
				`https://coordinated-care-cce88007d728.herokuapp.com/api/deleteQuestionFromUser/${userid}/questions/${eqid}`
			);
			await handleUpdateTrigger();
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setCurrentPage("questionsPage");
		}
	};

	const handleReturnQuestionButton = async (event) => {
		toggleEditQuestionPage(false);
	};

	//Edit Question Placeholder Sets
	useEffect(() => {
		setpqTitleText(eqTitle);
		setpqSummaryText(eqSummary);
		setpqQuestionText(eqText);
		setpqTagsText(eqTags.join(" "));
		setpqNE1(false);
		setpqNE2(false);
		setpqNE3(false);
		setpqNE4(false);
	}, [eqTitle, eqSummary, eqText, eqTags]);

	return (
		<div id="editQuestionPage">
			<form id="editQuestionForm">
				<div>
					<label className="editQuestionLabels">Question Title*</label>
					<label className="editQuestionSubLabels">Limit title to 50 characters or less</label>
					<textarea
						id="pqTitle"
						maxLength="50"
						onChange={handlepqTiteTextarea}
						value={pqTitleText}
					></textarea>
					<label id="pqNE1" className="pqNullError" style={{ display: pqNE1 ? "block" : "none" }}>
						Please fill in a value
					</label>
				</div>

				<div>
					<label className="editQuestionLabels">Question Summary*</label>
					<label className="editQuestionSubLabels">Limit title to 140 characters or less</label>
					<textarea
						id="pqSummary"
						maxLength="140"
						onChange={handlepqSummaryTextarea}
						value={pqSummaryText}
					></textarea>
					<label id="pqNE2" className="pqNullError" style={{ display: pqNE2 ? "block" : "none" }}>
						Please fill in a value
					</label>
				</div>

				<div id="editQuestionTextDiv">
					<label className="editQuestionLabels">Question Text*</label>
					<label className="editQuestionSubLabels">Add details</label>
					<textarea id="pqText" onChange={handlepqQuestionTextarea} value={pqQuestionText}></textarea>
					<label id="pqNE3" className="pqNullError" style={{ display: pqNE3 ? "block" : "none" }}>
						Please fill in a value
					</label>
					<label id="pqHLE1" className="pqNullError" style={{ display: pqHLE1 ? "block" : "none" }}>
						Hyperlink must begin with https:// or http://
					</label>
				</div>

				<div>
					<label className="editQuestionLabels">Tags*</label>
					<label className="editQuestionSubLabels">Add keywords separated by whitespace</label>
					<textarea id="pqTags" onChange={handlepqTagsTextarea} value={pqTagsText}></textarea>
					<label id="pqNE4" className="pqNullError" style={{ display: pqNE4 ? "block" : "none" }}>
						Please fill in a value
					</label>
					<label id="pqTE1" className="pqNullError" style={{ display: pqTE1 ? "block" : "none" }}>
						Tags must be under 10 characters and a maximum of 5 tags
					</label>
				</div>

				<span id="editQuestionLastLine">
					<input
						type="submit"
						id="postQuestionButton"
						value="Edit Question"
						className="editQuestionButton"
						onClick={handlePostQuestionButton}
					/>
					<button type="button" id="returnQuestionButton" onClick={handleReturnQuestionButton}>
						Return
					</button>
					<button type="button" id="deleteQuestionButton" onClick={handleDeleteQuestionButton}>
						Delete Question
					</button>
					<span id="editQuestionErrors">*Indicates Mandatory fields</span>
				</span>
			</form>
		</div>
	);
}
