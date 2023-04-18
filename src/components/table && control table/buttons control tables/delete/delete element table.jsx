import React from "react";
import styles from "../buttons.module.css"

function DeleteElementTable() {
    return(
        <button className={styles.deleteElementTable}>
            <p>Удалить</p>
        </button>
    )
}

export default DeleteElementTable;