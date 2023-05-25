import React, { useEffect } from "react";
import Navigation from "../../components/nav/navigation";
import Header from "../../components/header/ready header";
import "../../styles/ordersUser.scss"
import axios from "axios";
import OrderCard from "../../components/cards/big card/orderCard";
import { useState } from "react";
const host = process.env.REACT_APP_HOST;

function OrdersUser(props) {
    const [orders, setOrders] = useState([]);

    console.log(localStorage.getItem("idUser"))

    useEffect(() => {
      axios.get(`http://${host}:5008/orders`)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      }).catch((error) => {
        console.log(error);
      })
      axios
        .get(`http://${host}:5008/orders`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }, []);


    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header title="Заказы" isDashboard="no" />
                <p className="textOurOrders">Ваши заказы:</p>
                {orders.map((order) => (
                    <OrderCard data={order} />
                ))}
            </div>
        </div>
    )
}

export default OrdersUser;