import React from "react";
import NotificationAction from "../notifications/action";
import { useState } from "react";
import "../../styles/notifications.scss";

function Notification() {

    const [showNotification, setShow] = useState("false");

    function ShowNotification() {
        setShow(!showNotification);
    }

    return (
        <>
            <button className="buttonNotification" onClick={ShowNotification} style={window.location.pathname === "/dashboard" ? {top: "97px"} : {top: "55px"}}>
                <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="47" height="47" rx="9" fill="none" />
                    <path d="M16.3692 19.3457C16.7922 15.7278 19.8575 13 23.5 13V13C27.1425 13 30.2078 15.7278 30.6308 19.3457L30.9068 21.706C30.9553 22.1211 30.9796 22.3287 31.0142 22.5325C31.1677 23.4377 31.476 24.3097 31.9254 25.1104C32.0266 25.2906 32.1382 25.4673 32.3613 25.8207L33.0851 26.9672C33.9205 28.2902 34.3382 28.9518 34.0732 29.4614C34.0657 29.4757 34.0579 29.4899 34.0498 29.5039C33.7604 30 32.978 30 31.4132 30H15.5868C14.022 30 13.2396 30 12.9502 29.5039C12.9421 29.4899 12.9343 29.4757 12.9268 29.4614C12.6618 28.9518 13.0795 28.2902 13.9149 26.9672L14.6387 25.8207C14.8618 25.4673 14.9734 25.2906 15.0746 25.1104C15.524 24.3097 15.8323 23.4377 15.9858 22.5325C16.0204 22.3287 16.0447 22.1211 16.0932 21.706L16.3692 19.3457Z" stroke="#222222" />
                    <path d="M20.1193 31.0353C20.3187 31.8858 20.7581 32.6374 21.3693 33.1734C21.9806 33.7094 22.7295 34 23.5 34C24.2705 34 25.0194 33.7095 25.6307 33.1734C26.2419 32.6374 26.6813 31.8858 26.8807 31.0353" stroke="#222222" stroke-linecap="round" />
                </svg>
            </button>
            <NotificationAction showNotification={showNotification}/>
        </>
    )
}

export default Notification;