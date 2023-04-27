import React from "react";
import "../../../styles/cards.scss";

function InformationCard(props) {
    return (
        <div className="infoCardWrapper">
            <p className="infoCardTitle">Менеджеры</p>
            {props.data.map((item, key) => {
                return item.name === "AxiosError" ? (
                    <div key={key} className="infoCardContent">
                        <p style={{ color: "red" }}>Ошибка подключения к серверу</p>
                    </div>
                ) : (
                    key <= 8 ?
                    <div key={key} className="infoCardContent">
                        <div className="aboutPeople">
                            <p className="infoCardName">{item.login}</p>
                            <a className="infoCardEmail" href={`mailto: ${item.email}`}> {item.email} </a>
                        </div>
                    </div> : <></>
                );
            })}
        </div>
    );
}

export default InformationCard;
