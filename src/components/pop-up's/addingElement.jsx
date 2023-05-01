import React from "react";
import "../../styles/pop-up's/addingElement.scss";
import { useState } from "react";

function AddingElement(props) {


    const [addingElement, setAddingElement] = useState({
        nameClient: "",
        surnameClient: "",
        patronimycClient: "",
        composition: "",
        dateDeadline: "",
        manager: "",
        quantity: "",
        status: "В ожидании",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setAddingElement({
            ...addingElement,
            [name]: value
        });
    }

    function resetStandart(event) {
        event.stopPropagation()
        console.log(event.key)
    }

    function processingItem(event) {
        event.preventDefault()
        event.stopPropagation()
        console.log(addingElement)
    }

    return (
        <div className="formElement" onClick={resetStandart}>
            <div className="wrapperFormElement">
                <div className="headerFormElement">
                    <p className="titleFormElement">Новый заказ</p>
                    <p>Введите следующие данные:</p>
                </div>
                <form className="mainForm" method="post" >
                    <div className="formProps">
                        <label htmlFor="nameClient" >Имя клиента: </label>
                        <input onChange={handleChange} type="text" name="nameClient" placeholder="Имя клиента" />
                    </div>
                    <div className="formProps">
                        <label htmlFor="surnameClient">Фамилия клиента:</label>
                        <input onChange={handleChange} type="text" name="surnameClient" placeholder="Фамилия клиента" />
                    </div>
                    <div className="formProps">
                        <label htmlFor="patronimycClient">Отчество клиента</label>
                        <input onChange={handleChange} type="text" name="patronimycClient" placeholder="Отчество клиента" />
                    </div>
                    <div className="formProps">
                        <label htmlFor="composition">Состав заказа</label>
                        <input onChange={handleChange} type="text" name="composition" placeholder="Состав заказа" />
                    </div>
                    <div className="formProps">
                        <label htmlFor="dateDeadline">Дата сдачи заказа</label>
                        <input onChange={handleChange} type="text" name="dateDeadline" placeholder="Дата сдачи заказа" />
                    </div>
                    <div className="formProps">
                        <label htmlFor="manager">Менеджер</label>
                        <input onChange={handleChange} type="text" name="Менеджер" placeholder="Менеджер" />
                    </div>
                    <div className="formProps">
                        <label htmlFor="count">Количество</label>
                        <input onChange={handleChange} type="text" name="quantity" placeholder="Количество (шт.)" />
                    </div>
                    <div className="formProps">
                        <label htmlFor="status">Статус</label>
                        <select onChange={handleChange} name="status" id="">
                            <option value="В процессе">В процессе</option>
                            <option value="В ожидании">В ожидании</option>
                            <option value="Выполнен">Выполнен</option>
                        </select>
                    </div>
                    <button className="buttonCreate" onClick={processingItem}>Создать заказ</button>
                </form>
            </div>
        </div>
    );
}

export default AddingElement;