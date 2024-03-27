import React from "react";
import "./Sidebar.css";

export default function Sidebar({ setCurrentPage, setSearchTrigger, setSearch }) {
    const loadQuestionsPage = () => {
        setSearchTrigger("");
        setSearch("");
        setCurrentPage("questionsPage");
    };

    const loadTagsPage = () => {
        setCurrentPage("tagsPage");
    };

    const loadUserProfilePage = () => {
        setCurrentPage("userProfilePage");
    };

    return (
        <div className="sidebar">
            <div className="sidebarButtons">
                <button type="button" className="sidebarButton" id="questionsButton" onClick={loadQuestionsPage}>
                    Questions
                </button>
                <button type="button" className="sidebarButton" id="tagsButton" onClick={loadTagsPage}>
                    Tags
                </button>
                <button type="button" className="sidebarButton" id="userProfileButton" onClick={loadUserProfilePage}>
                    User Profile
                </button>
            </div>
        </div>
    );
}
