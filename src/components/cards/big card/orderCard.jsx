import React from "react";
import "../../../styles/ordersUser.scss";

function OrderCard(props) {

    console.log(props.data.composition)
    return(
        <div className="wrapperOrderCard">
            <p className="title">Название товара: {props.data.composition}</p>
            <p className="date">Дата создания: {props.data.dateDeadline}</p>
            <p className="status">Статус заказа: {props.data.status}</p>
            <div className="wrapperFooter" style={{display: "flex"}}>
                <p className="price">Номер заказа: {props.data.idOrder}</p>
                <button className="buttonDetail">Подробнее</button>
            </div>
        </div>
    )
}

export default OrderCard;