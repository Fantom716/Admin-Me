import React from "react";
import Navigation from "../components/nav/navigation";
import Desktop from "../components/desktop/desktop";

function Orders() {
    return(
        <div style={{display: "flex"}}>
            <Navigation/>
            <div className='' style={{width: "100vw"}}>
                <p>Orders</p>
            </div>
        </div>
    )
}

export default Orders;