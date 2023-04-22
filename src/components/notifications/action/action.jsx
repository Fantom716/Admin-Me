import React from "react";
import styles from "./action.module.css"

const typesAction = [
    {
        title: "Новый элемент добавлен",
        alt: "Добавление нового элемента",
        icon: "notification/action/add.svg"
    },
    {
        title: "Элемент удален",
        alt: "Удаление элемента",
        icon: "notification/action/delete.svg"
    },
    {
        title: "Добавлен новый ярлык",
        alt: "Добавление нового ярлыка",
        icon: "notification/action/adding new label.svg"
    },
    {
        title: "Обновление системы",
        alt: "Обновление системы",
        icon: "notification/action/update system.svg"
    }
]

function NotificationAction(props) {
    return (
        <div className={styles.notificationActionWrapper} style={props.showNotification ? {visibility: "hidden"} : {visibility: "visible"}}>
            {typesAction.map(item => <div className={styles.notificationActionItem}> <img className={styles.notificationActionIcon} alt={item.alt} src={item.icon}></img> <p>{item.title}</p></div>)}
        </div>
    )
}

export default NotificationAction;