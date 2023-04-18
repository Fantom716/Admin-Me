import React from "react";
import Navigation from "../components/nav/navigation";
import Header from "../components/header/assemblyHeader/ready header";
import PanelControlTable from "../components/table && control table/panel control/panelControlTable";
import TableFromDB from "../components/table && control table/table/table";

function Clients(props) {
    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header />
                <PanelControlTable />
                <TableFromDB />
            </div>
        </div>
    )
}

export default Clients;