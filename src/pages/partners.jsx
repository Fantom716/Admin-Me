import React from "react";
import Header from "../components/header/assemblyHeader/ready header";
import Navigation from "../components/nav/navigation";

function Partners() {
    return (
        <div style={{ display: "flex" }}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F9FAFE", overflow: "auto" }}>
                <Header />
            </div>
        </div>
    )
}

export default Partners;