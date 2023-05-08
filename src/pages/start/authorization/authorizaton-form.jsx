import React, { useState } from "react";
import "../../../styles/auth/authorization.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const authorizationPlaceholder = [
  {
    name: "login",
    type: "text",
    title: "Логин",
  },
  {
    name: "password",
    type: "password",
    title: "Пароль",
  },
];

function Authorization() {
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
    axios.get("http://localhost:5007/users").then((response) => {
      const user = response.data.find(
        (user) => user.login === formValue.login && user.password === formValue.password
      );
      if (user) {
        formValue.id = user["idUser"]
        formValue.role = user["role"]
        localStorage.setItem("idUser", formValue.id);
        localStorage.setItem("login", formValue.login);
        setFormValue({ error: "" });
        axios.post(`http://localhost:5007/form`, formValue)
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
      <form onSubmit={handleSubmit} className="mainForm">
      <div className="headerForm">
        <p className="headerGreetingForm">Авторизация в информационной системе</p>
        <p className="headerNameSystem">Admin</p>
      </div>
        {authorizationPlaceholder.map(authorizationPlaceholder =>
          <input name={authorizationPlaceholder.name} onChange={handleChange} type={authorizationPlaceholder.type} className="formInput" placeholder={authorizationPlaceholder.title} />)}
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