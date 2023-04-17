import React from "react";
import styles from "./account.module.css"

function NotificationAccount(props) {

    return(
        <div className={props.name ? styles.notificationAccountWrapperActive : styles.notificationAccountWrapperDisable} style={props.openMenu ? {visibility: "hidden"} : {visibility: "visible"}}>
            <ul className={styles.notificationList}>
                <button className={styles.notificationItem}>
                    <img className={styles.notificationIcon} src="/notification/account/info.svg" alt="i" />
                    О системе
                </button>
                <button className={styles.notificationItem}>
                    <img className={styles.notificationIcon} src="/notification/account/question.svg" alt="question" />
                    Поддержка
                </button>
                <button className={styles.notificationItem}>
                    <img className={styles.notificationIcon} src="/notification/account/file_dock.svg" alt="file" />
                    FAQ
                </button>
                <button className={styles.notificationItem}>
                    <img className={styles.notificationIcon} src="/notification/account/settings.svg" alt="settings" />
                    Настройки
                </button>
                <button className={styles.notificationItem}>
                    <img className={styles.notificationIcon} src="/notification/account/sign_out.svg" alt="sign out" />
                    Выход
                </button>
            </ul>
            {console.log(props.openMenu)}
        </div>
    )
}

export default NotificationAccount;