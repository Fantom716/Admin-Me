import React from "react";
import { useState } from "react";
import styles from "../mainStartStyles.module.css"
import axios from "axios";
var validator = require('validator');

const registrationPlaceholder = [
    {
        name: "login",
        type: "text",
        title: "Логин"
    },
    {
        name: "email",
        type: "text",
        title: "Почта",
    },
    {
        name: "role",
        type: "",
        title: "Роль",
    },
    {
        name: "password",
        type: "password",
        title: "Пароль"
    },
    {
        name: "repeatPassword",
        type: "password",
        title: "Повторите пароль"
    }
]

function Registration() {

    const [formValue, setFormValue] = useState({
        login: "",
        email: "",
        password: "",
        repeatPassword: "",
        role: "Пользователь",
    })

    const [error, setError] = useState("");

    function changeError(error) {
        setError(error);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleFormSubmit(event) {
        event.preventDefault();
    }

    function handleSubmit() {

        axios
            .get("http://localhost:5001/users")
            .then(res => {
                const logins = res.data;
                let loginsBool = false;
                logins.map(item => {
                    if (item.login === formValue.login) {
                        loginsBool = true;
                        changeError("Логин уже занят");
                    }
                    else if(item.email === formValue.email) {
                        changeError("Почта уже занята");
                    }
                });
                if (!loginsBool) {
                    if (formValue.login.length < 5) {
                        changeError("Логин должен содержать 5 символов");
                    } else if (validator.isEmail(formValue.email) !== true) {
                        changeError("Неверный формат почты");
                    } else if (
                        validator.isStrongPassword(formValue.password, { minLength: 8 }) !== true
                    ) {
                        changeError("Пароль должен содержать не менее 8 символов: минимум 1 заглавная буква, 1 строчная буква, 1 цифра");
                    } else if (formValue.password !== formValue.repeatPassword) {
                        changeError("Пароли не совпадают");
                    } else {
                        changeError("");
                        axios.post("http://localhost:5001/form", formValue);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className={styles.formWrapper}>
            <form onSubmit={handleFormSubmit} action="" method="post" className={styles.RegistrationForm}>
                <div className={styles.headerForm}>
                    <p className={styles.headerGreetingForm}>Регистрация в информационной системе</p>
                    <p className={styles.headerNameSystem}>Admin</p>
                </div>
                {registrationPlaceholder.map(item => item.title !== "Роль" ?
                    <input type={item.type} name={item.name} onChange={handleChange} placeholder={item.title} className={styles.formInput} /> :
                    <select name={item.name} onChange={handleChange} className={styles.select}>
                        <option defaultValue={"Пользователь"} value="Пользователь">Пользователь</option>
                        <option value="Менеджер">Менеджер</option>
                        <option value="Администратор">Администратор</option>
                    </select>)}
                <p className={styles.errorNotify}>{error}</p>
                <button className={styles.mainButton} type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
                <div className={styles.footerForm}>
                    <p className={styles.footerArticle}>или</p>
                    <a className={styles.registerLink} href="/authorization">Хочу войти в аккаунт</a>
                </div>
            </form>
        </div>
    )
}

export default Registration;