import React from "react";
import Greeting from "./greeting";
import Notification from "./notification";
import FormSearch from "./form";
import "../../styles/header.scss";

function Header(props) {
    return (
        <header style={window.location.pathname == "/" ? {marginBottom: "0px"} : {marginBottom: "54px"}}>
            <Greeting name={props.name} />
            <FormSearch />
            <Notification />
        </header>
    )
}

export default Header;