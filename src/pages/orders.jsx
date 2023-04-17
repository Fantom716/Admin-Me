import React from "react";
import Navigation from "../components/nav/navigation";
import Header from "../components/header/assemblyHeader/ready header";

function Orders(props) {
    return (
        <div style={{ display: "flex" }}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header />
            </div>
        </div>
    )
}

export default Orders;