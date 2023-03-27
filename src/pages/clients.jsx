import React from "react";
import Navigation from "../components/nav/navigation";

function Clients() {
    return(
        <div style={{display: "flex"}}>
            <Navigation/>
            <div className='' style={{width: "100vw"}}>
                <p>Clients</p>
            </div>
        </div>
    )
}

export default Clients;