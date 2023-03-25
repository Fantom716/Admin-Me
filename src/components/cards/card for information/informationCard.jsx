import React from "react";
import styles from './informationCard.module.css'

function InformationCard(props) {
    return(
        <div className={styles.infoCardWrapper}>
            <p className={styles.infoCardTitle}>{props.titleCard}</p>
            <div className={styles.infoCardContent}>
                <p className={styles.infoCardName}>{props.name}</p>
                <a href={props.mail} className={styles.infoCardSub}>{props.mail}</a>
            </div>
        </div>
    )
}

export default InformationCard;