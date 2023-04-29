import React, { useEffect } from "react";
import Navigation from "../../components/nav/navigation";
import Header from "../../components/header/ready header";
import "../../styles/ordersUser.scss"
import axios from "axios";
import OrderCard from "../../components/cards/big card/orderCard";
import { useState } from "react";


function OrdersUser(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5010/user/orders")
        .then((response) => {
          setOrders(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }, []);

    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header />
                <p className="textOurOrders">Ваши заказы:</p>
                {orders.map((order) => (
                    <OrderCard data={order} />
                ))}
            </div>
        </div>
    )
}

export default OrdersUser;