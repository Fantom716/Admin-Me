import React from "react";
import "../../../styles/cardManager.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function SellsCard(props) {

  const [data, setData] = useState([]);
  const [addElement, setAddElement] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    axios.get("http://localhost:5010/sells")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setData(error);
      })
  }, []);

  console.log(data)

  const cleanedPhoneNumber = (number) => {
    return number.replace(/[^+0-9]/g, "");
  }

  const toggleEdit = (index) => {
    if (index === editIndex) {
      setEditIndex(-1);
    } else {
      setEditIndex(index);
    }
  };

  const handleChange = (event, index, field) => {
    const newData = [...data];
    newData[index][field] = event.target.value;
    setData(newData);
  };

  const addNewElement = (event) => {
    event.preventDefault()
    const newElement =
      <div className="aboutCard">
        <div className="valuesCard">
          <input type="text" placeholder="ID продажи" className="inputValueCard"></input>
          <input type="text" placeholder="Дата продажи" className="inputValueCard"></input>
          <input type="text" placeholder="ID заказа" className="inputValueCard"></input>
          <input type="text" placeholder="Цена продукта" className="inputValueCard"></input>
          <input type="text" placeholder="Продавец" className="inputValueCard"></input>
          <p>Все поля являются обязательными</p>
        </div>
        <div className="wrapperButtons" style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <button className="cancelButton headerButtonMain"></button>
          <button className="addButton headerButtonMain"></button>
        </div>
      </div>
    setAddElement(currentElements => [...currentElements, newElement]);
  }

  return (
    <div className="wrapperCards" style={{ background: "#F0F3FF" }}>
      <button onClick={addNewElement} className="cardWrapper"></button>
      {addElement}
      {data.map((sell, index) => {
        return (
          <div key={index} className="aboutCard">
            <div className="valuesCard">
              {editIndex === index ? (
                <>
                  <input type="text" className="inputValueCard" value={sell.countSell} onChange={(event) => handleChange(event, index, "countSell")}></input>
                  <input type="text" className="inputValueCard" value={sell.dateSell} onChange={(event) => handleChange(event, index, "dateSell")}></input>
                  <input type="text" className="inputValueCard" value={sell.idOrder} onChange={(event) => handleChange(event, index, "idOrder")}></input>
                  <input type="text" className="inputValueCard" value={sell.price} onChange={(event) => handleChange(event, index, "price")}></input>
                  <input type="text" className="inputValueCard" value={sell.seller} onChange={(event) => handleChange(event, index, "seller")}></input>
                </>
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