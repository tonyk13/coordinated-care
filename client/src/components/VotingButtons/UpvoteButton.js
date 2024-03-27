import React from "react";
import "./UpvoteButton.css";

export default function UpvoteButton({ handleUpvote }) {
    return (
        <button type="button" id="upvoteButton" onClick={handleUpvote}>
            ▲
        </button>
    );
}
