import React from "react";
import "../../styles/header.scss";

function FormSearch() {
    return (
        <form action="post">
            <div className="icon">
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13.2917" cy="13.2917" r="7.25" stroke="#222222" />
                    <path d="M24.1667 24.1667L20.5417 20.5417" stroke="#222222" stroke-linecap="round" />
                </svg>
            </div>
            <input type="text" name="form-search" id="search" placeholder="Search" />
        </form>
    )
}

export default FormSearch;