import React from "react";
import "../../../styles/cards.scss";

function MainDesktopCard(props) {

    return (
        <div className="wrapperProductCard">
            {props.infoForMain === "Новых пользователей нет" ? <p>Новых пользователей нет</p> :
                <>
                    <p className="productCardTitle">{props.infoForMain.title}</p>
                    <p className="productCardDescription">{props.infoForMain.description}</p>
                </>
            }
        </div>
    )
}

export default MainDesktopCard;