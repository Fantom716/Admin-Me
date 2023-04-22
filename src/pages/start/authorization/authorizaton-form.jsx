import React from "react";
import styles from "../mainStartStyles.module.css"
import { useState } from "react";
import axios from "axios";

const authorizationPlaceholder = [
    {
        name: "login",
        type: "text",
        title: "Логин"
    },
    {
        name: "password",
        type: "password",
        title: "Пароль"
    }
]

function Authorization() {

    const [formValue, setFormValue] = useState({
        login: "",
        password: "",
    })

    const [autho, setAutho] = useState({
        authoBool: false,
        login: false,
        password: false
    });

    function checkAutho(value) {
        setAutho({
          ...autho,
          authoBool: value
        });
      }

    function handleChange(event) {
        const {name, value} = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.get("http://localhost:5001/users").then(response => {
          response.data.forEach(user => {
            if (user.login === formValue.login && user.password === formValue.password) {
              checkAutho(true);
            } else {
              checkAutho(false);
            }
          });
        });
      }


    return(
        <div className={styles.authorizationWrapper}>
            <div className={styles.headerForm}>
                <p className={styles.headerGreetingForm}>Авторизация в информационной системе</p>
                <p className={styles.headerNameSystem}>Admin</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.AuthorizationForm}>
                {authorizationPlaceholder.map(authorizationPlaceholder =>
                <input name={authorizationPlaceholder.name} onChange={handleChange} type={authorizationPlaceholder.type} className={styles.formInput} placeholder={authorizationPlaceholder.title} />)}
                <p className={styles.errorNotify}>{checkAutho}</p>
                <button onClick={checkAutho} className={styles.mainButton} type="submit">Авторизоваться</button>
                <div className={styles.footerForm}>
                    <p className={styles.footerArticle}>или</p>
                    <a className={styles.registerLink} href="/registration">Зарегистрировать аккаунт</a>
                </div>
            </form>
        </div>
    )
}

export default Authorization;