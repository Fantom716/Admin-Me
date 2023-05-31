import React from "react";
import "../../../styles/cards.scss";

function InformationCard(props) {

    return (
        <div className="infoCardWrapper">
            <p className="infoCardTitle">{props.data[0]["title"]}</p>
            {props.data.map((item, key) => {
                return item.name === "AxiosError" ? (
                    <div key={key} className="infoCardContent">
                        <p style={{ color: "red" }}>Ошибка подключения к серверу</p>
                    </div>
                ) : (
                    key <= 8 ?
                        <div key={key} className="infoCardContent">
                            <p className="infoCardName">{item.info}</p>
                            <a className="infoCardEmail" href={`mailto: ${item.link}`}> {item.link} </a>
                        </div> : <></>
                );
            })}
        </div>
    );
}

export default InformationCard;
