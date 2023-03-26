import React from "react";
import styles from './informationCard.module.css'

function InformationCard(props) {
    return(
        <div className={styles.infoCardWrapper}>
            <p className={styles.infoCardTitle}>Менеджеры</p>
            <div className={styles.infoCardContent}>
                <p className={styles.infoCardName}>Тест</p>
                <a href={`mailto: ${props.mail}`} className={styles.infoCardSub}>test@gegyf.com</a>
            </div>
        </div>
    )
}

export default InformationCard;