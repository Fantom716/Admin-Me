import React from "react";
import Header from "../../components/header/ready header";
import Navigation from "../../components/nav/navigation";
import PartnerCard from "../../components/cards/manager/partnerCard";

function Partners() {
    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto", position: "relative" }}>
                <Header title="Партнеры" isDashboard="no" />
                <PartnerCard />
            </div>
        </div>
    )
}

export default Partners;