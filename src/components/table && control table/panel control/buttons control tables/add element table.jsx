import React from "react";
import { useState } from "react";
import "../../../../styles/contol table.scss";
import AddingElement from "../../../pop-up's/addingElement";

function AddElementTable() {

    const [popUp, setPopUp] = useState(false);

    function changePopUp() {
        setPopUp(!popUp);
    }

    return(
        <button onClick={changePopUp} className="addElementTable">
            {popUp ? <AddingElement /> : <></>}
            <p>Добавить</p>
        </button>
    )
}

export default AddElementTable;