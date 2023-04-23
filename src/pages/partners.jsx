import React from "react";
import Header from "../components/header/assemblyHeader/ready header";
import Navigation from "../components/nav/navigation";
import PanelControlTable from "../components/table && control table/panel control/panelControlTable";
import { useState, useEffect } from "react";
import axios from "axios";
import TableFromDB from "../components/table && control table/table/table";

function Partners() {

    const nameColumns = {
        idPartner: "ID партнера",
        type: "Тип партнера",
        phoneNumber: "Номер телефона",
        address: "Адрес",
    }

    const [partners, setPartners] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5003/partners")
            .then(res => {
                setPartners(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

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

export default Partners;