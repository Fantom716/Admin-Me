import React from "react";
import styles from './desktop.module.css';
import BigCard from "../cards/big card/big-card";
import SmallCard from "../cards/small card/small-card-type";
import InformationCard from "../cards/card for information/informationCard";
import SmallCardType from "../cards/small card/small-card-add";

function Desktop() {
    return (
        <div className={styles.wrapperDesktop}>
            <div className={styles.statsticArea}>
                <BigCard />
                <BigCard />
                <BigCard />
            </div>
            <div className={styles.workDesktop}>
                <div className={styles.cards}>
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                    <SmallCardType />
                </div>
                <InformationCard mail="test@gmail.com" />
            </div>
        </div>
    )
}

export default Desktop;