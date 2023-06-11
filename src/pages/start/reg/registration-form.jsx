import React from "react";
import { useState } from "react";
import "../../../styles/auth/authorization.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";
var validator = require('validator');
const host = process.env.REACT_APP_HOST;

function Registration() {

  const [formValue, setFormValue] = useState({
    login: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "Пользователь",
    surname: "",
    name: "",
    patronimyc: ""
  });

  const navigate = useNavigate();
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
      .get(`http://${host}:3092/users`)
      .then(res => {
        const logins = res.data;
        console.log(logins)
        let loginsBool = false;
        logins.forEach(item => {
          if (item.login === formValue.login) {
            loginsBool = true;
            changeError("Логин уже занят");
          } else if (item.email === formValue.email) {
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
            const postData = {
              login: formValue.login,
              email: formValue.email,
              password: formValue.password,
              repeatPassword: formValue.repeatPassword,
              role: formValue.role,
              surname: formValue.surname,
              name: formValue.name,
              patronimyc: formValue.patronimyc
            };
            changeError("Вы успешно зарегистрированы, перейдите на страницу авторизации по ссылке ниже");
          }
        }
      })
      .catch(err => {
        changeError(`Произошла ошибка: ${err}`);
      });
  }

  return (
    <div className="formWrapper">
      <form onSubmit={handleFormSubmit} method="post" className="mainForm">
        <div className="headerForm">
          <p className="headerGreetingForm">Регистрация в информационной системе</p>
          <p className="headerNameSystem">Admin<span className="prefixTitleSystem">-Me</span></p>
        </div>
          <>
            <input
              type="text"
              name="surname"
              onChange={handleChange}
              placeholder="Фамилия"
              className="formInput formInputRegister"
            />
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Имя"
              className="formInput formInputRegister"
            />
            <input
              type="text"
              name="patronimyc"
              onChange={handleChange}
              placeholder="Отчество"
              className="formInput formInputRegister"
            />
            <input
              type="text"
              name="login"
              onChange={handleChange}
              placeholder="Логин"
              className="formInput formInputRegister"
            />
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Почта"
              className="formInput formInputRegister"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Пароль"
              className="formInput formInputRegister"
            />
            <input
              type="password"
              name="repeatPassword"
              onChange={handleChange}
              placeholder="Повторите пароль"
              className="formInput formInputRegister"
            />
            <select
              name="role"
              onChange={handleChange}
              className="select formInputEmployee">
              <option
                defaultValue="Пользователь"
                value="Пользователь">Пользователь</option>
              <option value="Менеджер">Менеджер</option>
            </select>
          </>
        <p className="errorNotify">{error}</p>
        <button
          className="mainButton"
          type="submit"
          onClick={handleSubmit}>Зарегистрироваться</button>
        <div className="footerForm">
          <p className="footerArticle">или</p>
          <a className="registerLink" href="/">У меня уже есть аккаунт</a>
        </div>
      </form>
    </div>
  );
}


export default Registration;