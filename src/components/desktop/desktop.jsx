import React from "react";
import BigCard from "../cards/big card/big-card";
import SmallCard from "../cards/small card/small-card-type";
import InformationCard from "../cards/card for information/informationCard";
import SmallCardType from "../cards/small card/small-card-add";
import "../../styles/desktop.scss";
import CardProduct from "../cards/big card/productCard";

function Desktop(props) {

    return (
        <div className="wrapperDesktop">
            <div className="statsticArea">
                {props.statistic.map((item) => {
                    return ( <BigCard data={item} /> )
                })}
            </div>
            <div className="workDesktop">
                <div className="cards">
                    {props.infoForMain.map((item) => {
                        return (
                            <CardProduct infoForMain={item} />
                        )
                    })}
                </div>
                <InformationCard data={props.dataForInfoCard} />
            </div>
        </div>
    )
}

export default Desktop;