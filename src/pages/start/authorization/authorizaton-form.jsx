import React from "react";
import styles from "../mainStartStyles.module.css"

const authorizationPlaceholder = [
    {
        title: "Логин"
    },
    {
        title: "Пароль"
    }
]

function Authorization() {
    return(
        <div className={styles.authorizationWrapper}>
            <div className={styles.headerForm}>
                <p className={styles.headerGreetingForm}>Авторизация в информационной системе</p>
                <p className={styles.headerNameSystem}>Admin</p>
            </div>
            <div className=""></div>
            <form className={styles.AuthorizationForm}>
                {authorizationPlaceholder.map(authorizationPlaceholder => <input className={styles.formInput} placeholder={authorizationPlaceholder.title} />)}
                <button className={styles.mainButton} type="submit">Авторизоваться</button>
                <div className={styles.footerForm}>
                    <p className={styles.footerArticle}>или</p>
                    <a className={styles.registerLink} href="/registration">Зарегистрировать аккаунт</a>
                </div>
            </form>
        </div>
    )
}

export default Authorization;