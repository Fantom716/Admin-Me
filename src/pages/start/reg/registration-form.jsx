import React from "react";
import { useState } from "react";
import styles from "../mainStartStyles.module.css"
import axios from "axios";

const registrationPlaceholder = [
    {
        name: "login",
        type: "text",
        title: "Логин"
    },
    {
        name: "email",
        type: "email",
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
        role: "user",
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setFormValue({
          ...formValue,
          [name]: value
        });
      }

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(formValue);
      }

    function handleSubmit() {
        axios.post("http://localhost:3001/users", formValue);
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
                        <option selected={true} value="user">Пользователь</option>
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