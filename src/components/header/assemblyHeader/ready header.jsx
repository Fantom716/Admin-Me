import React from "react";
import Greeting from "../greeting/greeting";
import Notification from "../notification/notification";
import style from './ready header.module.css'

function Header() {
    return(
        <header>
            <Greeting />
            <Notification />
        </header>
    )
}

export default Header;