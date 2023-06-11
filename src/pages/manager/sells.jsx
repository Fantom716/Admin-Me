import Header from "../../components/header/ready header";
import Navigation from "../../components/nav/navigation";
import SellsCard from "../../components/cards/manager/sells";

function Sells() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto", position: "relative" }}>
                <Header title="Продажи" isDashboard="no" />
                <SellsCard />
            </div>
        </div>
    )
}

export default Sells;