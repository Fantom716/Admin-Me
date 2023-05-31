import React, { useState } from "react";
import "../../../styles/auth/authorization.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../components/redux/users/actions";
import { useDispatch, useSelector } from "react-redux";
import { clearNotifys } from "../../../components/redux/notifications/actions";
const host = process.env.REACT_APP_HOST;

function Authorization() {

  const dispatch = useDispatch();
  const selector = useSelector((state) => state)

  const clear = () => {
    dispatch(clearNotifys())
  }

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

  console.log(selector.auht)

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(`http://${host}:3092/users`).then((response) => {
      console.log(response.data)
      console.log(response.data[0].login)
      const user = response.data.find(
        (user) => user.login === formValue.login && user.password === formValue.password
      );
      if (user) {
        formValue.id = user["idUser"]
        formValue.role = user["role"]
        localStorage.setItem("idUser", formValue.id);
        localStorage.setItem("login", formValue.login);
        setFormValue({ error: "" });
        const id = localStorage.getItem("idUser")
        const valuesSubmit = [formValue.login, formValue.password, formValue.role, id]
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
        console.log("ok")
        dispatch(addUser({ id }, selector));
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
        <button
          onClick={checkAutho}
          className="mainButton"
          type="submit"
        >
        Авторизоваться
        </button>
        <div className="footerForm">
          <p className="footerArticle">или</p>
          <a className="registerLink" href="/registration">Зарегистрировать аккаунт</a>
        </div>
      </form>
    </div>
  )
}

export default Authorization;