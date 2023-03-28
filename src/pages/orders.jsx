import React from "react";
import Navigation from "../components/nav/navigation";
import Desktop from "../components/desktop/desktop";
import Header from "../components/header/assemblyHeader/ready header";

function Orders(props) {
    return(
        <div style={{display: "flex"}}>
            <Navigation/>
            <div className='' style={{width: "100vw"}}>
                <Header />
            </div>
        </div>
    )
}

export default Orders;