import React from "react";
import Navigation from "../components/nav/navigation";
import Header from "../components/header/assemblyHeader/ready header";

function Clients(props) {
    return(
        <div style={{display: "flex"}}>
            <Navigation/>
            <div className='' style={{width: "100vw"}}>
                <Header/>
            </div>
        </div>
    )
}

export default Clients;