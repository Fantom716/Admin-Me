import React from "react";
import styles from "./big-card.module.css"

function BigCard(props) {

    return (
        <div className={styles.wrapperCard}>
            {props.data.name === "AxiosError" || props.data.name === "" ?
                <p style={{ color: "red", fontSize: "1.1rem", textAlign: "center", lineHeight: "1.5rem" }}>Ошибка получения статистических данных, проверьте соединение с сервером</p>
                :
                <>
                    <div className={styles.headerCard}>
                        <div className="header__icon">
                            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="54" height="54" rx="15" fill="#D8CBFF" />
                                <path d="M23.625 34.875L21.375 27" stroke="#FF95F4" stroke-linecap="round" />
                                <path d="M19.125 14.625L14.625 21.375M34.875 14.625L39.375 21.375" stroke="#FF95F4" stroke-linecap="round" />
                                <path d="M30.375 34.875L32.625 27" stroke="#FF95F4" stroke-linecap="round" />
                                <path d="M10.125 21.375V21.375C10.7379 21.375 11.0444 21.375 11.3081 21.4486C11.8341 21.5953 12.2773 21.9508 12.5346 22.4324C12.6636 22.6739 12.7301 22.9731 12.8631 23.5714L16.1789 38.4927C16.5126 39.9944 16.6795 40.7452 17.2279 41.1851C17.7763 41.625 18.5454 41.625 20.0837 41.625H33.9163C35.4546 41.625 36.2237 41.625 36.7721 41.1851C37.3205 40.7452 37.4874 39.9944 37.8211 38.4927L41.1369 23.5714C41.2699 22.9731 41.3364 22.6739 41.4654 22.4324C41.7227 21.9508 42.1659 21.5953 42.6919 21.4486C42.9556 21.375 43.2621 21.375 43.875 21.375V21.375" stroke="#FF95F4" stroke-linecap="round" />
                                <path d="M7.875 21.375H46.125" stroke="#FF95F4" stroke-linecap="round" />
                            </svg>
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