import React from "react";
import styles from './greeting.module.css'

function Wrapper(Inside) {
    return (
        <div className={styles.greetingWrapper}>{Inside}</div>
    )
}

function Greeting(props) {

    if (window.location.pathname === "/") {
        return (
            Wrapper(
                <p className={styles.greetingText}>Привет {props.name}, <br />
                    <span className={styles.greetingBig}>Добро пожаловать</span>
                </p>
            )
        )
    } else if (window.location.pathname === "/clients") {
        return (
            Wrapper(<p className={styles.greetingText}>Клиенты</p>)
        )
    } else if (window.location.pathname === "/orders") {
        return (
            Wrapper(<p className={styles.greetingText}>Заказы</p>)
        )
    } else if (window.location.pathname === "/sells") {
        return (
            Wrapper(<p className={styles.greetingText}>Продажи</p>)
        )
    } else if (window.location.pathname === "/partners") {
        return (
            Wrapper(<p className={styles.greetingText}>Партнеры</p>)
        )
    } else {
        return (Wrapper
            (<p className={styles.greetingText}>Ошибка</p>)
        )
    }
}

export default Greeting;