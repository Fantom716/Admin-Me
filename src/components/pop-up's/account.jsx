import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/notifications.scss";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/users/actions";

function NotificationAccount(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    function handleLogout() {
        navigate("/");
        dispatch(removeUser(localStorage.getItem("idUser")))
        localStorage.removeItem("idUser");
        localStorage.removeItem("login");
    }

    function goToSupport() {
        const id = localStorage.getItem("idUser")
        navigate(`/user/${id}/support`);
    }

    return (
        <div className={props.name ? "notificationAccountWrapperActive" : "notificationAccountWrapperDisable"} style={props.openMenu ? { visibility: "hidden" } : { visibility: "visible" }}>
            <ul className="notificationList">
                <button className="notificationItem">
                    <img className="notificationIcon" src="/notification/account/about_system.svg" alt="about system" />
                    О системе
                </button>
                <button onClick={() => goToSupport()} className="notificationItem">
                    <img className="notificationIcon" src="/notification/account/support.svg" alt="support" />
                    Поддержка
                </button>
                <button className="notificationItem">
                    <img className="notificationIcon" src="/notification/account/faq.svg" alt="faq" />
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
        </div>
    )
}

export default NotificationAccount;