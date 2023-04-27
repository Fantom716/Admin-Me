import React, { useEffect } from "react";
import Navigation from "../components/nav/navigation";
import Header from "../components/header/assemblyHeader/ready header";
import PanelControlTable from "../components/table && control table/panel control/panelControlTable";
import TableFromDB from "../components/table && control table/table/table";
import axios from "axios";
import { useState } from "react";

function Orders(props) {

    const nameColumn = {
        idOrder: "ID заказа",
        nameClient: "Имя клиента",
        surnameClient: "Фамилия клиента",
        patronimycClient: "Отчество клиента",
        composition: "Состав заказа",
        dateDeadline: "Дата сдачи заказа",
        manager: "Менеджер",
        quantity: "Количество (шт.)",
        status: "Статус"
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/orders")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header />
                <PanelControlTable />
                <TableFromDB nameColumns={nameColumn} data={data} />
            </div>
        </div>
    )
}

export default Orders;