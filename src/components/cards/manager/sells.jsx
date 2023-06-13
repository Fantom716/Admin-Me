import React from "react";
import "../../../styles/cardManager.scss";
import { useEffect, useState } from "react";
import axios from "axios";
const host = process.env.REACT_APP_HOST;

function SellsCard(props) {

  const [data, setData] = useState([]);
  const [addElement, setAddElement] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    axios.get(`http://${host}:5010/sells`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setData(error);
      })
  }, []);

  const handleChange = (event, index, field) => {
    const newData = [...data];
    newData[index][field] = event.target.value;
    setData(newData);
  };

  return (
    <div className="wrapperCards" style={{ background: "#F0F3FF" }}>
      <button className="cardWrapper"></button>
      {addElement}
      {data.map((sell, index) => {
        return (
          <div key={index} className="aboutCard">
            <div className="valuesCard">
              {editIndex === index ? (
                <form className="formCard">
                  <input type="text" className="inputValueCard" value={sell.countSell} onChange={(event) => handleChange(event, index, "countSell")}></input>
                  <input type="text" className="inputValueCard" value={sell.dateSell} onChange={(event) => handleChange(event, index, "dateSell")}></input>
                  <input type="text" className="inputValueCard" value={sell.idOrder} onChange={(event) => handleChange(event, index, "idOrder")}></input>
                  <input type="text" className="inputValueCard" value={sell.price} onChange={(event) => handleChange(event, index, "price")}></input>
                  <input type="text" className="inputValueCard" value={sell.seller} onChange={(event) => handleChange(event, index, "seller")}></input>
                </form>
              ) : (
                <>
                  <p className="valueCard">{sell.idSell}</p>
                  <p className="valueCard">Дата продажи: {sell.dateSell}</p>
                  <p className="valueCard">ID заказа: {sell.idOrder}</p>
                  <p className="valueCard">Цена продукта: {sell.price}</p>
                  <p className="valueCard">Продавец: {sell.seller}</p>
                </>
              )}
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

export default SellsCard;