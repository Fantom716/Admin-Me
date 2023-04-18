import React from "react";
import styles from "./small-card-type.module.css";

function SmallCardType(props) {
    return (
        <button className={styles.cardWrapper}>
            <div className={styles.iconCard}>
                <img src="card/icons/small card add/Add label.svg" alt="Add card" />
            </div>
            <p className={styles.cardTitle}>Добавить</p>
        </button>
    )
}

export default SmallCardType;