import React from "react";
import "../../../../styles/contol table.scss";
import { useState } from "react";
import DeleteElement from "../../../pop-up's/deleteElement";

function DeleteElementTable() {

    const [popUp, setPopUp] = useState(false);

    function changePopUp() {
        setPopUp(!popUp);
    }

    return(
        <button onClick={changePopUp} className="deleteElementTable">
            {popUp ? <DeleteElement /> : <></>}
            <p>Удалить</p>
        </button>
    )
}

export default DeleteElementTable;