import React from "react";
import "./AnswerQuestionButton.css";

export default function AnswerQuestionButton({ setCurrentPage }) {
    return (
        <button
            type="button"
            id="answerQuestionButton"
            onClick={() => setCurrentPage("newAnswerPage")}
        >
            Answer Question
        </button>
    );
}
