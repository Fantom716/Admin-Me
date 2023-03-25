import React from "react";
import BigCard from "../cards/big card/big-card";
import styles from './statistic.module.css';

function Statistic() {
    return(
        <div className={styles.wrapperStatistic}>
            <BigCard />
            <BigCard />
            <BigCard />
        </div>
    )
}

export default Statistic;