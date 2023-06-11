import React from "react";
import Greeting from "./greeting";
import Notification from "./notification";
import "../../styles/header.scss";

function Header(props) {
    return (
        <header style={window.location.pathname === "/" ? {marginBottom: "0px"} : {marginBottom: "54px"}}>
            <Greeting title={props.title} isDashboard="no" />
            <Notification />
        </header>
    )
}

export default Header;