import React, { useEffect } from "react";
import Header from "../components/header/ready header";
import Navigation from "../components/nav/navigation";
import PanelControlTable from "../components/table && control table/panelControlTable";
import { useState } from "react";
import axios from "axios";
import TableFromDB from "../components/table && control table/table";

function Sells() {

    const nameColumns = {
        idSell: "ID продажи",
        idOrder: "ID заказа",
        seller: "Продавец",
        price: "Цена (руб.)",
        countSell: "Количество (шт.)",
        dateSell: "Дата продажи",
    }

    const [sells, setSells] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/sells")
            .then(res => {
                setSells(res.data);
            })
            .catch(err => {
                setSells(err);
            })
    }, [])

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header />
                <PanelControlTable />
                <TableFromDB data={sells} nameColumns={nameColumns} />
            </div>
        </div>
    )
}

export default Sells;