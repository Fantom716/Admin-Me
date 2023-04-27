import React from "react";
import DeleteElementTable from "../buttons control tables/delete element table";
import AddElementTable from "../buttons control tables/add element table";
import EditElementTable from "../buttons control tables/edit element table";
import "../../../styles/contol table.scss";

function PanelControlTable() {
    return(
        <div className="panelContolTable">
            <AddElementTable />
            <EditElementTable />
            <DeleteElementTable />
        </div>
    )
}

export default PanelControlTable;