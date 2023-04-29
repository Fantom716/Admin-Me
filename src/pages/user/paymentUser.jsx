import React, { useEffect } from "react";
import Navigation from "../../components/nav/navigation";
import Header from "../../components/header/ready header";
import "../../styles/paymentUser.scss"
import axios from "axios";
import { useState } from "react";

function PaymentDetails(props) {
    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header />
                <p className="textOurPaymentDetails">Ваши платежные данные:</p>
            </div>
        </div>
    )
}

export default PaymentDetails;