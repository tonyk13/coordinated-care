import React from "react";
import "./DownvoteButton.css";

export default function DownvoteButton({ handleDownvote }) {
    return (
        <button type="button" id="downvoteButton" onClick={handleDownvote}>
            ▼
        </button>
    );
}
