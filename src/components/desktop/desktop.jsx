import React from "react";
import BigCard from "../cards/big card/big-card";
import InformationCard from "../cards/card for information/informationCard";
import "../../styles/desktop.scss";
import MainDesktopCard from "../cards/big card/mainDesktopCard";
import { useState } from "react";

function Desktop(props) {
    const { statistic, infoForMain, dataForInfoCard } = props;
    const lastTitleRubric = infoForMain[infoForMain.length - 1]["titleRubric"];
    const isFirstInfoAxiosError = infoForMain[0]["name"] === "AxiosError";
    console.log(infoForMain)
    const cards = isFirstInfoAxiosError ? <p className="errorGetMainDesktopCard">Ошибка подключения к серверу</p> : infoForMain.map((item) => <MainDesktopCard infoForMain={item} />);
    const [displayInfoCard, setdisplayInfoCard] = useState(false)

    return (
        <div className="wrapperDesktop">
            <div className="statsticArea">
                {statistic.map((item) => (
                    <BigCard data={item} />
                ))}
            </div>
            <p className="titleRubric">{lastTitleRubric}</p>
            <div className="workDesktop">
                <div className="cards">
                    {cards}
                </div>
                <InformationCard data={dataForInfoCard} displayInfoCard={displayInfoCard} />
            </div>
        </div>
    );
}


export default Desktop;