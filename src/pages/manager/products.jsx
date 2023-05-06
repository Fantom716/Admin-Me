import React from "react";
import Header from "../../components/header/ready header";
import Navigation from "../../components/nav/navigation";
import ProductCard from "../../components/cards/manager/products";

function Products() {
    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header />
                <ProductCard />
            </div>
        </div>
    )
}

export default Products;