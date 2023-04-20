import React from "react";
import styles from "../mainStartStyles.module.css"

const registrationPlaceholder = [
    {
        title: "Логин"
    },
    {
        title: "Почта",
    },
    {
        title: "Роль",
    },
    {
        title: "Пароль"
    },
    {
        title: "Повторите пароль"
    }
]

function Registration() {
    return (
        <div className={styles.formWrapper}>
            <form action="" method="post" className={styles.RegistrationForm}>
                <div className={styles.headerForm}>
                    <p className={styles.headerGreetingForm}>Регистрация в информационной системе</p>
                    <p className={styles.headerNameSystem}>Admin</p>
                </div>
                {registrationPlaceholder.map(item => item.title !== "Роль" ?
                    <input type="text" name="" id="" placeholder={item.title} className={styles.formInput} /> :
                    <select className={styles.select}>
                        <option value="manage">Менеджер</option>
                        <option value="admin">Администратор</option>
                    </select>)}
                <button className={styles.mainButton} type="submit">Зарегистрироваться</button>
                <div className={styles.footerForm}>
                    <p className={styles.footerArticle}>или</p>
                    <a className={styles.registerLink} href="/authorization">Хочу войти в аккаунт</a>
                </div>
            </form>
        </div>
    )
}

export default Registration;