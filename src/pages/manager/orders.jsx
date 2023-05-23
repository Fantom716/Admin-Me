import Navigation from "../../components/nav/navigation";
import Header from "../../components/header/ready header";
import OrderCardManager from "../../components/cards/manager/orderManager";


function Orders(props) {
    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto", position: "relative" }}>
                <Header title="Заказы" isDashboard="no" />
                <OrderCardManager />
            </div>
        </div>
    )
}

export default Orders;