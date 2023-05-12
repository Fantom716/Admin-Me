import React from "react";
import "../../styles/header.scss";

function Wrapper(Inside) {
  return (
    <div className="greetingWrapper">{Inside}</div>
  )
}

export const greetingElement = () => {
  return (
    Wrapper(
      <p className="greetingText">Привет {localStorage.getItem("login")}, <br />
        <span className="greetingBig">Добро пожаловать</span>
      </p>
    )
  )
}

function Greeting(props) {

  if (props.isDashboard === "no") {
    return (
      Wrapper(
        <p className="greetingText">{props.title}</p>
      )
    )
  }
  else {
    return (
      Wrapper(
        <p className="greetingText">{props.title}</p>
      )
    )
  }
}

export default Greeting;