import React from "react";
import Greeting from "../greeting/greeting";
import Notification from "../notification/notification";
import style from './ready header.module.css'
import FormSearch from "../search form/form";

function Header(props) {
    return (
        <header>
            <Greeting name={props.name} />
            <FormSearch />
            <Notification />
        </header>
    )
}

export default Header;