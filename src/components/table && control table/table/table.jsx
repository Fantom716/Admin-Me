import React from "react";
import style from "./table.module.css"

function TableFromDB(props) {

    console.log(props.nameColumns)

    return (
        <div className={style.tableWrapper}>
            <table className={style.mainTable}>
                <thead>
                    <tr>
                        {Object.values(props.nameColumns).map((item) => {
                            return <th>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item) => {
                        return <tr>
                            {Object.values(item).map((item) => {
                                return <td>{item}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableFromDB;