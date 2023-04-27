import React from "react";
import Header from "../components/header/assemblyHeader/ready header";
import Navigation from "../components/nav/navigation";
import PanelControlTable from "../components/table && control table/panel control/panelControlTable";
import { useState, useEffect } from "react";
import axios from "axios";
import TableFromDB from "../components/table && control table/table/table";

function Products() {

    const nameColumns = {
        idProduct: "ID продукта",
        nameProduct: "Название продукта",
        descriprionProduct: "Описание продукта",
        categoryProduct: "Категория продукта",
        price: "Цена (руб.)",
        count: "Количество",
        nameCompany: "Разработчик",
        countSell: "Количество продаж",
        dateOfSell: "Дата поступления в продажу",
    }

    const [partners, setPartners] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then(res => {
                setPartners(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    console.log(partners)

    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header />
                <PanelControlTable />
                <TableFromDB data={partners} nameColumns={nameColumns} />
            </div>
        </div>
    )
}

export default Products;