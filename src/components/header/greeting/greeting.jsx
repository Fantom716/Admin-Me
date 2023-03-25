import React from "react";
import styles from './greeting.module.css'

function Greeting(props) {
    return(
        <div className={styles.greetingWrapper}>
            <p name="Александр" className={styles.greetingText}>Привет {props.name}, <br/> <span className={styles.greetingBig}>Добро пожаловать!</span></p>
        </div>
    )
}

export default Greeting;