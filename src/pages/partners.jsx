import React from "react";
import Header from "../components/header/assemblyHeader/ready header";
import Navigation from "../components/nav/navigation";

function Partners() {
    return (
        <div style={{ display: "flex" }}>
            <Navigation />
            <div className='' style={{ width: "100vw" }}>
                <Header />
            </div>
        </div>
    )
}

export default Partners;