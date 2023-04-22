import React from "react";
import styles from './informationCard.module.css'

function InformationCard(props) {
    return (
        <div className={styles.infoCardWrapper}>
            <p className={styles.infoCardTitle}>Менеджеры</p>
            <div className={styles.infoCardContent}>
                {props.data.map((item, key) => (
                    key > 4 ?
                    <div key={key} className={styles.aboutPeople}>
                        <p className={styles.infoCardName}>{item.login}</p>
                        <a className={styles.infoCardEmail} href={`mailto: + ${item.mail}`}>{item.email}</a>
                    </div>
                    :
                    <></>
                ))}
            </div>
        </div>
    )
}

export default InformationCard;