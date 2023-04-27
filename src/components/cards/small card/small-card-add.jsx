import React from "react";
import "../../../styles/cards.scss";

function SmallCardType(props) {
    return (
        <button className="cardWrapper">
            <div className="iconCard">
                <img src="card/icons/small card add/Add label.svg" alt="Add card" />
            </div>
            <p className="cardTitle">Добавить</p>
        </button>
    )
}

export default SmallCardType;