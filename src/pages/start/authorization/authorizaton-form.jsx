import React, { useState } from "react";
import "../../../styles/authorization.scss"
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
    axios.get("http://localhost:5006/users").then((response) => {
      const user = response.data.find(
        (user) => user.login === formValue.login && user.password === formValue.password
      );
      if (user) {
        navigate("/dashboard");
        localStorage.setItem("user", user.login);
      } else {
        setFormValue({ login: "", password: "" });
        setAutho({ authoBool: false, login: true, password: true });
      }
    });
  }

    return (
        <div className="authorizationWrapper">
            <div className="headerForm">
                <p className="headerGreetingForm">Авторизация в информационной системе</p>
                <p className="headerNameSystem">Admin</p>
            </div>
            <form onSubmit={handleSubmit} className="AuthorizationForm">
                {authorizationPlaceholder.map(authorizationPlaceholder =>
                    <input name={authorizationPlaceholder.name} onChange={handleChange} type={authorizationPlaceholder.type} className="formInput" placeholder={authorizationPlaceholder.title} />)}
                <p className="errorNotify">{checkAutho}</p>
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