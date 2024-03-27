import React, { useState } from "react";
import axios from "axios";
import "./NewAnswerPage.css";
import Cookie from "js-cookie";

export default function NewAnswerPage({ selectedQuestion, setCurrentPage, setDataBaseUpdateTrigger }) {
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");

    function handleAnswerChange(e) {
        setAnswer(e.target.value);
    }

    function checkHyperlinks(answer) {
        const hyperLinkRegex = /\[([^\]]*)\]\(([^)]*)\)/g;

        const hyperlinkMatches = [...answer.matchAll(hyperLinkRegex)];

        let hasInvalidHyperlink = false;

        for (const hl of hyperlinkMatches) {
            let hlURL = hl[2];

            if (hlURL.trim() === "" || (!hlURL.startsWith("http://") && !hlURL.startsWith("https://"))) {
                hasInvalidHyperlink = true;
                break;
            }
        }

        return !hasInvalidHyperlink;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!answer) {
            setError("Answer field is required");
            return;
        }

        if (!checkHyperlinks(answer)) {
            setError("Answer contains invalid hyperlinks");
            return;
        }

        try {
            const user = Cookie.get("auth");
            const response = await axios.post(`http://localhost:8000/api/questions/${selectedQuestion._id}/answers`, {
                text: answer,
                ans_by: user,
            });

    
            const userId = Cookie.get("userid");
            await axios.post(`http://localhost:8000/api/postAnswerToUser/${userId}/answers`, {
                _id: response.data._id
            });

            selectedQuestion = response.data.updatedQuestion;

            //UpdateTrigger to handle answers count
            const handleUpdateTrigger = async () => {
                return new Promise((resolve) => {
                setDataBaseUpdateTrigger((prev) => {
                    setTimeout(() => {
                    resolve(); 
                    }, 1000);
                    return prev + 1;
                });
                });
            };
            handleUpdateTrigger();
            setCurrentPage("answersPage");
        } catch (error) {
            console.error("Error posting answer:", error);
            setError("Error posting answer. Please try again.");
        }
    }

    return (
        <div id="answerQuestionPage">
            <form onSubmit={handleSubmit}>
                <div className="answerQuestionLabels">
                    <label htmlFor="answerText">Answer Text*</label>
                    <textarea value={answer} onChange={handleAnswerChange} id="answerQuestionTextDiv" />
                </div>
                {error && <p className="aqNullError">{error}</p>}
                <div id="answerQuestionLastLine">
                    <button id="postAnswerButton" type="submit" className="answerQuestionButton" onClick={handleSubmit}>
                        Post Answer
                    </button>
                </div>
            </form>
            <p className="footer">* indicates mandatory fields</p>
        </div>
    );
}
