import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function VersionsCard() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios
    .get("http://localhost:5023/admin/versions")
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
        {data.map((versions, index) => {
          return (
            <div key={index} className="aboutCard">
              <div className="valuesCard" style={{ width: "90%", marginRight: "50px" }}>
                <p className="valueCard">{versions.version}</p>
                <p className="valueCard">Дата релиза: {versions.date}</p>
                <p className="valueCard">Автор: {versions.author}</p>
                <p className="valueCard">Описание: {versions.description}</p>
              </div>
              <div className="wrapperButtons" style={{ alignSelf: "end" }}>
                <a href={versions.link} className="contactButton" style={{padding: "10px 10px"}}>Подробнее</a>
              </div>
            </div>
          )
        })}
      </div>
    );
}

export default VersionsCard;