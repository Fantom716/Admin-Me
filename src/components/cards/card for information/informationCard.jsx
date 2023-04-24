import React from "react";
import styles from './informationCard.module.css'

function InformationCard(props) {
    return (
        <div className={styles.infoCardWrapper}>
            <p className={styles.infoCardTitle}>Менеджеры</p>
            {props.data.map((item, key) => {
                return item.name === "AxiosError" ? (
                    <div key={key} className={styles.infoCardContent}>
                        <p style={{ color: "red" }}>Ошибка подключения к серверу</p>
                    </div>
                ) : (
                    key <= 8 ?
                    <div key={key} className={styles.infoCardContent}>
                        <div className={styles.aboutPeople}>
                            <p className={styles.infoCardName}>{item.login}</p>
                            <a className={styles.infoCardEmail} href={`mailto: ${item.email}`}> {item.email} </a>
                        </div>
                    </div> : <></>
                );
            })}
        </div>
    );
}

export default InformationCard;
