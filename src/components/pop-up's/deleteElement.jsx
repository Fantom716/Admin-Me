import React from "react";
import "../../styles/pop-up's/deleteElement.scss";

function DeleteElement(props) {
    function Button(event) {
        event.stopPropagation()
    }

    return (
        <div onClick={Button} className="wrapperDeleteForm">
            <div className="headerForm">
                <p className="titleFormElement">Удаление элемента</p>
                <form className="formDelete" action="">
                    <div className="selectGroupWrapper">
                        <label htmlFor="">Выберите группу </label>
                        <select name="selectGroup" id="">
                            <option value="clients">Клиенты</option>
                            <option value="orders">Заказы</option>
                            <option value="sells">Продажи</option>
                            <option value="partners">Партнеры</option>
                            <option value="products">Продукты</option>
                        </select>
                    </div>
                    <div className="selectItemWrapper">
                        <label htmlFor="selectItem">Выберите значение </label>
                        <select name="selectGroup" id="">
                            <option value="clients">Значения</option>
                        </select>
                    </div>
                <button className="buttonDelete">Удалить</button>
                <p className="deleteWarning">Внимание: удаление элемента необратимо</p>
                </form>
            </div>
        </div>
    )
}

export default DeleteElement;