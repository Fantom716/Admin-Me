import React from "react";
import "../../../styles/cards.scss";

function productCard(props) {

    console.log(props.infoForMain);
    return(
        <div className="wrapperProductCard">
            <p className="productCardTitle">{props.infoForMain.title}</p>
            <p className="productCardDescription">{props.infoForMain.description}</p>
        </div>
    )
}

export default productCard;