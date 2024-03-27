import React from "react";
import "./Header.css";

function Header({ setSearch, handleLogout, isGuest }) {
    const handleSearch = (event) => {
        if (event.key === "Enter") {
            const searchString = event.target.value;
            setSearch(searchString);
        }
    };

    return (
        <div id="header" className="header">
            <LogOutButton handleLogout={handleLogout} isGuest={isGuest} />
            <div className="headerText">Fake Stack Overflow</div>
            <input
                id="searchbar"
                className="searchbar"
                type="text"
                name="search"
                placeholder="Search.."
                onKeyDown={handleSearch}
            />
        </div>
    );
}

function LogOutButton({ handleLogout, isGuest }) {
    return (
        <div className="logOutButton">
            <button onClick={handleLogout}>{isGuest ? "Return to welcome page" : "Log out"} </button>
        </div>
    );
}

export default Header;
