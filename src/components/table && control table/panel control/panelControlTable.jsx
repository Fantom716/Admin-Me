import React from "react";
import style from "./panelControlTable.module.css"
import DeleteElementTable from "../buttons control tables/delete/delete element table";
import AddElementTable from "../buttons control tables/add/add element table";
import EditElementTable from "../buttons control tables/edit/edit element table";

function PanelControlTable() {
    return(
        <div className={style.panelContolTable}>
            <AddElementTable />
            <EditElementTable />
            <DeleteElementTable />
        </div>
    )
}

export default PanelControlTable;