import React, { useEffect } from "react";
import Navigation from "../../components/nav/navigation";
import Header from "../../components/header/ready header";
import axios from "axios";
import { useState } from "react";
import ClientCard from "../../components/cards/manager/clientCard";

function Clients(props) {
    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto", position: "relative" }}>
                <Header title="Клиенты" isDashboard="no" />
                <ClientCard />
            </div>
        </div>
    )
}

export default Clients;