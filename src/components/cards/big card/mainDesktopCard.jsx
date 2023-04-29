import React from "react";
import "../../../styles/cards.scss";

function MainDesktopCard(props) {

    console.log(props)
    return(
        <div className="wrapperProductCard">
            <p className="productCardTitle">{props.infoForMain.title}</p>
            <p className="productCardDescription">{props.infoForMain.description}</p>
        </div>
    )
}

export default MainDesktopCard;