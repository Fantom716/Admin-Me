import React from "react";
import BigCard from "../cards/big card/big-card";
import SmallCard from "../cards/small card/small-card-type";
import InformationCard from "../cards/card for information/informationCard";
import SmallCardType from "../cards/small card/small-card-add";
import "../../styles/desktop.scss";

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
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                </div>
                <InformationCard data={props.dataManagers} />
            </div>
        </div>
    )
}

export default Desktop;