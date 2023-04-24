import React from "react";
import styles from "./big-card.module.css"

function BigCard(props) {
    return (
        <div className={styles.wrapperCard}>
            {props.data.name === "AxiosError" ?
                <p style={{ color: "red", fontSize: "1.1rem", textAlign: "center", lineHeight: "1.5rem" }}>Ошибка получения статистических данных, проверьте соединение с сервером</p>
                :
                <>
                    <div className={styles.headerCard}>
                        <div className="header__icon">
                            <img className={styles.headerImage} src={props.data.image} alt={props.data.alt} />
                        </div>
                        <div className="header__statistic">
                            <div className={styles.headerPersentageWrapper}>
                                {+props.data.percentageState <= 0 ? <img className={styles.headerArrow} src="/card/icons/Arrow bottom.svg" alt="" /> : <img className={styles.headerArrow} src="/card/icons/Arrow up.svg" alt="" />}
                                <p style={+props.data.percentageState <= 0 ? { color: "#FF0000" } : { color: "#8bf705" }} className={styles.headerPersentageTitle}>{props.data.percentageState == "Infinity" ? 0 : props.data.percentageState + "%"}</p>
                            </div>
                            <p className={styles.headerTime}>За неделю</p>
                        </div>
                    </div>
                    <div className="footer__card">
                        <p className={styles.footerSubtitle}>{props.data.name}</p>
                        <p className={styles.footerCount}>{props.data.currentValue}</p>
                    </div>
                </>
            }

        </div>
    )
}

export default BigCard;