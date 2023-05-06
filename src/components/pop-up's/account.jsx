import React from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import "../../styles/notifications.scss";

function NotificationAccount(props) {

    const navigate = useNavigate();

    function handleLogout() {
        navigate("/");
        localStorage.removeItem("idUser");
        localStorage.removeItem("login");
    }

    return (
        <div className={props.name ? "notificationAccountWrapperActive" : "notificationAccountWrapperDisable"} style={props.openMenu ? { visibility: "hidden" } : { visibility: "visible" }}>
            <ul className="notificationList">
                <button className="notificationItem">
                    <img className="notificationIcon" src="/notification/account/info.svg" alt="i" />
                    О системе
                </button>
                <button className="notificationItem">
                    <img className="notificationIcon" src="/notification/account/question.svg" alt="question" />
                    Поддержка
                </button>
                <button className="notificationItem">
                    <img className="notificationIcon" src="/notification/account/file_dock.svg" alt="file" />
                    FAQ
                </button>
                <button className="notificationItem">
                    <img className="notificationIcon" src="/notification/account/settings.svg" alt="settings" />
                    Настройки
                </button>
                <button onClick={handleLogout} className="notificationItem">
                    <img
                        className="notificationIcon"
                        src="/notification/account/sign_out.svg"
                        alt="sign out"
                    />
                    Выход
                </button>
            </ul>
            {console.log(props.openMenu)}
        </div>
    )
}

export default NotificationAccount;