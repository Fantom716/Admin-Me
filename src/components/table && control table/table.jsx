import React from "react";
import "../../styles/table.scss";

function TableFromDB(props) {
    return (
        <div className="tableWrapper">
            <table className="mainTable">
                <thead>
                    <tr>
                        {Object.values(props.nameColumns).map((item) => {
                            return <th>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.data["name"] === "AxiosError" ? <></> :
                    props.data.map((item) => {
                        return <tr>
                            {Object.values(item).map((item) => {
                                return <td>{item}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
            {props.data["name"] === "AxiosError" ? <p style={{color: "red", textAlign: "center"}}>Ошибка получения данных</p> : <></>}
        </div>
    )
}

export default TableFromDB;
