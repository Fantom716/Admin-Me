import React from "react";
import styles from "./big-card.module.css"

function BigCard(props) {

    console.log(props.data.val);

    return (
        <div className={styles.wrapperCard}>
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
                        <svg className={styles.headerArrow} width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.70711 0.292892C8.31658 -0.0976315 7.68342 -0.0976314 7.29289 0.292892L0.928932 6.65685C0.538407 7.04738 0.538407 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292892ZM9 22L9 1L7 1L7 22L9 22Z" fill="#00FF38" />
                        </svg>
                        <p className={styles.headerPersentageTitle}>23%</p>
                    </div>
                    <p className={styles.headerTime}>За неделю</p>
                </div>
            </div>
            <div className="footer__card">
                <p className={styles.footerSubtitle}>{props.data.name}</p>
                <p className={styles.footerCount}>{props.data.value}</p>
            </div>
        </div>
    )
}

export default BigCard;