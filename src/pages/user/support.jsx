import React from "react";
import SupportCard from "../../components/cards/user/supportCard";
import Header from "../../components/header/ready header";
import Navigation from "../../components/nav/navigation";
import "../../styles/support.scss"

function Support() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Navigation />
      <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
        <Header title="Поддержка" isDashboard="no" />
        <p className="headerText">Появились вопросы? Заполните форму и вам обязательно помогут!</p>
        <SupportCard />
      </div>
    </div>
  )
}

export default Support;