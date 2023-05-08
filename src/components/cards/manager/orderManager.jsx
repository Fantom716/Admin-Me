import React from "react";
import "../../../styles/cardManager.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function OrderCardManager(props) {

  const [data, setData] = useState([]);
  const [addElement, setAddElement] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [responseOrder, setResponseOrder] = useState([]);
  const [orders, setOrders] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [deleteClick, setDeleteClick] = useState(false);
  const [addOrder, setAddOrder] = useState({
    client: 0,
    composition: "",
    dateDeadline: "",
    manager: "",
    quantity: "",
    status: "",
    error: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5012/orders")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setData(error);
      })
    axios.get("http://localhost:5015/clients")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        setOrders(error);
      })
  }, [])

  console.log(orders)

  const handleInputChange = (e) => {
    e.preventDefault();
    setAddOrder({ ...addOrder, [e.target.name]: e.target.value });
  }

  const toggleEdit = (index) => {
    if (editIndex === index) {
      setEditIndex(-1);
    } else {
      setEditIndex(index);
    }
  }

  const { client, composition, dateDeadline, manager, quantity, status, error } = addOrder;

  const addingOrder = (e) => {
    e.preventDefault();
    if (!addOrder.client || !addOrder.composition || !addOrder.dateDeadline || !addOrder.manager || !addOrder.quantity || !addOrder.status) {
      setAddOrder({ ...addOrder, error: "Заполнены не все поля" });
      return;
    }
    axios.post("http://localhost:5012/orders/add", addOrder)
      .then((response) => {
        setResponseOrder(response.data);
        setAddOrder({
          idorder: "",
          client: "",
          composition: "",
          dateDeadline: "",
          manager: "",
          quantity: "",
          status: "",
        });
        setAddElement(false);
      })
      .catch((error) => {
        setAddOrder({ ...addOrder, error: error });
      });
  };

  const deletingOrder = (id) => {
    setDeleteClick(true);
    axios.post(`http://localhost:5012/orders/delete`, { idOrder: id })
      .then((response) => {
        setResponseOrder(response.data);
      })
      .catch((error) => {
        setResponseOrder(error);
      })
  }

  const setText = (event) => {
    setAddOrder({ ...addOrder, error: event.target.value });
  }

  const handleChange = (event, index, field) => {
    const newData = [...data];
    newData[index][field] = event.target.value;
    setData(newData);
  };

  const addNewElement = (event) => {
    event.preventDefault()
    setAddElement(!addElement);
  }

  const handleSave = (index) => {
    const updatedOrder = data[index];

    axios.post("http://localhost:5012/orders/update", updatedOrder)
      .then((response) => {
        setResponseOrder(response.data);
      })
      .catch((error) => {
        setResponseOrder(error);
      })
  }

  const handleCancel = () => {
    setEditIndex(-1);
    setData(data.map((order, index) => index === editIndex ? originalOrder : order));
  };

  return (
    <div className="wrapperCards" style={{ background: "#F0F3FF" }}>

      {addElement ?
        (
          <>
          <button onClick={addNewElement} className="mainButtonAddDel buttonDel"></button>
          <div className="addingAboutCard aboutCard">
            <form className="inputValuesCard valuesCard">
              <p className="valueCard">Заполните следующие данные:</p>
              <select className="inputValueCard selectInput" name="client" id="" placeholder="Заказ" value={addOrder.client} onChange={handleInputChange}>
                <option disabled selected value="selectDisabled">Клиент</option>
                {orders.map((client, index) => {
                  return (
                    <option name="client" key={index} value={client.idClient}>{client.name} {client.surname}</option>
                  )
                })}
              </select>
              <input type="text" required className="inputValueCard" name="composition" placeholder="Состав заказа" onChange={handleInputChange} />
              <input type="date" required className="inputValueCard" name="dateDeadline" placeholder="Дата сдачи заказа" onChange={handleInputChange} />
              <input type="text" required className="inputValueCard" name="manager" placeholder="Менеджер" onChange={handleInputChange} />
              <input type="number" required className="inputValueCard" name="quantity" placeholder="Количество" onChange={handleInputChange} />
              <input type="text" required className="inputValueCard" name="status" placeholder="Статус" onChange={handleInputChange} />
              <p onChange={setText} className="error">{error}</p>
              <p>Все поля являются обязательными</p>
            </form>
            <div className="wrapperButtons" style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <button onClick={addingOrder} className="addButton headerButtonMain"></button>
            </div>
          </div>
        </>
        ) : (
          <button onClick={addNewElement} className="mainButtonAddDel buttonAdd"></button>
        )}

      {data.map((order, index) => {
        return (
          <div className="aboutCard">
            <div className="valuesCard">
              {editIndex === index ? (
                <form>
                  <input className="inputValueCard" placeholder="ID заказа" value={order.idOrder} onChange={(event) => handleChange(event, index, "idOrder")} type="text" />
                  <input className="inputValueCard" placeholder="Имя" value={order.name} onChange={(event) => handleChange(event, index, "name")} type="text" />
                  <input className="inputValueCard" placeholder="Фамилия" value={order.surname} onChange={(event) => handleChange(event, index, "surname")} type="text" />
                  <input className="inputValueCard" placeholder="Отчество" value={order.patronimyc} onChange={(event) => handleChange(event, index, "patronimyc")} type="text" />
                  <input className="inputValueCard" placeholder="Состав заказа" value={order.composition} onChange={(event) => handleChange(event, index, "composition")} type="text" />
                  <input className="inputValueCard" placeholder="Дата сдачи заказа" value={order.dateDeadline} onChange={(event) => handleChange(event, index, "patronimyc")} type="date" />
                  <input className="inputValueCard" placeholder="Менеджер" value={order.manager} onChange={(event) => handleChange(event, index, "dateDeadline")} type="text" />
                  <input className="inputValueCard" placeholder="Количество" value={order.quantity} onChange={(event) => handleChange(event, index, "quantity")} type="number" />
                  <input className="inputValueCard" placeholder="Статус" value={order.status} onChange={(event) => handleChange(event, index, "status")} type="text" />
                </form>
              ) : (
                <>
                  <p className="valueCard">{order.idOrder}</p>
                  <p className="valueCard">Имя: {order.name}</p>
                  <p className="valueCard">Фамилия: {order.surname}</p>
                  <p className="valueCard">Отчество: {order.patronimyc}</p>
                  <p className="valueCard">Состав заказа: {order.composition}</p>
                  <p className="valueCard">Дата сдачи заказа: {order.dateDeadline}</p>
                  <p className="valueCard">Менеджер: {order.manager}</p>
                  <p className="valueCard">Количество: {order.quantity} копий</p>
                  <p className="valueCard">Статус: {order.status}</p>
                </>
              )}
            </div>
            <div className="wrapperButtons">
              <div className="headerButtons">
                {editIndex === index ? (
                  <>
                    <button onClick={handleSave} className="addButton headerButtonMain acceptButton"></button>
                    <button onClick={() => handleCancel(index)} className="contactButton headerButtonMain cancelButton"></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEdit(index)} className="contactButton headerButtonMain editButton"></button>
                    <button className="contactButton headerButtonMain deleteButton" onClick={() => deletingOrder(order.idOrder)}></button>
                  </>
                )}
              </div>
              <button className="contactButton" style={{ padding: "10px" }}> Подробнее </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default OrderCardManager;