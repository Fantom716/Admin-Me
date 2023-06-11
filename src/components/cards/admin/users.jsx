import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
const host = process.env.REACT_APP_HOST;

function AdminUsersCard() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios
    .get(`http://${host}:5022/admin/users`)
    .then((res) => {
        setData(res.data)
      })
    .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log(data)

  return (
      <div className="wrapperCards" style={{ background: "#F0F3FF" }}>
        <button className="cardWrapper"></button>
        {data.map((user, index) => {
          return (
            <div key={index} className="aboutCard">
              <div className="valuesCard">
                <p className="valueCard">{user.login}</p>
                <p className="valueCard">Почта: {user.email}</p>
                <p className="valueCard">Дата регистрации: {user.regDate}</p>
                <p className="valueCard">Роль: {user.role}</p>
              </div>
              <div className="wrapperButtons" style={{ alignSelf: "end" }}>
                <button className="contactButton" style={{padding: "10px 10px"}}>Подробнее</button>
              </div>
            </div>
          )
        })}
      </div>
    );
}

export default AdminUsersCard;