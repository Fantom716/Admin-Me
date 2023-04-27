import React from "react";
import "../../styles/header.scss";

function Wrapper(Inside) {
    return (
        <div className="greetingWrapper">{Inside}</div>
    )
}

function Greeting(props) {

    if (window.location.pathname === "/dashboard") {
        return (
            Wrapper(
                <p className="greetingText">Привет {localStorage.getItem("user")}, <br />
                    <span className="greetingBig">Добро пожаловать</span>
                </p>
            )
        )
    } else if (window.location.pathname === "/clients") {
        return (
            Wrapper(<p className="greetingText">Клиенты</p>)
        )
    } else if (window.location.pathname === "/orders") {
        return (
            Wrapper(<p className="greetingText">Заказы</p>)
        )
    } else if (window.location.pathname === "/sells") {
        return (
            Wrapper(<p className="greetingText">Продажи</p>)
        )
    } else if (window.location.pathname === "/products") {
        return (
            Wrapper(<p className="greetingText">Продукты</p>)
        )
    } else if (window.location.pathname === "/partners") {
        return (
            Wrapper(<p className="greetingText">Партнеры</p>)
        )
    } else {
        return (Wrapper
            (<p className="greetingText">Ошибка</p>)
        )
    }
}

export default Greeting;