import React, { useState } from "react";
import "../../../styles/auth/authorization.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const host = process.env.REACT_APP_HOST;

function Authorization() {

  console.log(host)

  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    login: "",
    password: "",
    id: "",
    role: "",
    error: ""
  });

  const [autho, setAutho] = useState({
    authoBool: false,
    login: false,
    password: false,
  });

  function checkAutho(value) {
    setAutho({
      ...autho,
      authoBool: value,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(`http://${host}:3092/users`).then((response) => {
      console.log(response.data)
      console.log(response.data[0].login)
      const user = response.data.find(
        (user) => user.login === formValue.login && user.password === formValue.password
        );
        console.log("login:" + formValue.login)
        console.log(user + ": user") // undefined
        if (user) {
        console.log(formValue)
        formValue.id = user["idUser"]
        formValue.role = user["role"]
        localStorage.setItem("idUser", formValue.id);
        localStorage.setItem("login", formValue.login);
        setFormValue({ error: "" });
        const valuesSubmit = [formValue.login, formValue.password, formValue.role, localStorage.getItem("idUser")]
        axios.post(`http://${host}:3092/form`, valuesSubmit)
          .then((response) => {
            console.log(response.data);
            if (formValue.role === "Пользователь") {
              navigate(`user/${formValue.id}/dashboard/`);
            } else if (formValue.role === "Менеджер") {
              navigate(`manager/${formValue.id}/dashboard/`);
            } else if (formValue.role === "Администратор") {
              navigate(`admin/${formValue.id}/dashboard/`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setFormValue({ error: "Неверный логин или пароль" });
        setAutho({ authoBool: false, login: false, password: false });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit} className="mainForm formAuthorization">
        <div className="headerForm">
          <p className="headerGreetingForm">Авторизация в информационной системе</p>
          <p className="headerNameSystem">Admin</p>
        </div>
        <input
          type="text"
          name="login"
          onChange={handleChange}
          className="formInput formInputAuthorization"
          placeholder="Логин"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="formInput formInputAuthorization"
          placeholder="Пароль"
        />
        {formValue ? <p className="errorNotify">{formValue.error}</p> : {}}
        <button onClick={checkAutho} className="mainButton" type="submit">Авторизоваться</button>
        <div className="footerForm">
          <p className="footerArticle">или</p>
          <a className="registerLink" href="/registration">Зарегистрировать аккаунт</a>
        </div>
      </form>
    </div>
  )
}

export default Authorization;