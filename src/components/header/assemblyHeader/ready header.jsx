import React from "react";
import Greeting from "../greeting/greeting";
import Notification from "../notification/notification";
import FormSearch from "../search form/form";
import styles from './ready header.module.css'

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