import React from "react";
import Header from "../../components/header/ready header";
import Navigation from "../../components/nav/navigation";
import AdminUsersCard from "../../components/cards/admin/users";
import Versions from "../../components/cards/admin/versions";
import VersionsCard from "../../components/cards/admin/versions";

function VersionsPage() {
    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header />
                <VersionsCard />
            </div>
        </div>
    )
}

export default VersionsPage;