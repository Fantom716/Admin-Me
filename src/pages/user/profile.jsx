import React, { useEffect } from "react";
import Navigation from "../../components/nav/navigation";
import Header from "../../components/header/ready header";
import "../../styles/profile.scss"
import axios from "axios";
import { useState } from "react";


function Profile(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5095/clients/profile").then((res) => {
            setData(res.data);
        });
    }, [])

    console.log(typeof (data))
    console.log(data)
    console.log(data["name"])

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header title="Ваш профиль" isDashboard="no" />
                <div className="wrapperProfile">
                    <div className="wrapperData">
                        <div className="mainDataClient">
                            <h2 className="profileRubric">Основные данные</h2>
                            <p className="valueRubric">Фамилия: {data["surname"]}</p>
                            <p className="valueRubric">Имя: {data["name"]}</p>
                            <p className="valueRubric">Отчество: {data["patronimyc"]}</p>
                            <p className="valueRubric">Паспортные данные: {data["passportInfo"]}</p>
                            <p className="valueRubric">Дата регистрации: {data["regDate"]}</p>
                        </div>
                        <div className="contactDataClient">
                            <h2 className="profileRubric">Контактные данные</h2>
                            <p className="valueRubric">Почта: {data["email"]}</p>
                            <p className="valueRubric">Номер телефона: {data["phoneNumber"]}</p>
                        </div>
                    </div>
                    <p className="valueRating valueRubric">Ваш рейтинг: {data["rating"]}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;