import React from "react";
import "../../../styles/cardManager.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { deletePartnerRequest, deletePartnerSuccess, deletePartnerFailure } from "../../redux/manager/partners/actions";
import { updatePartnerRequest, updatePartnerSuccess, updatePartnerFailure } from "../../redux/manager/partners/actions";
import { useDispatch, useSelector } from "react-redux";
import { addPartnerFailure } from "../../redux/manager/partners/actions";
import { addNotify, deleteNotify, editNotify } from "../../redux/notifications/actions";
import { actions } from "./clientCard";
const host = process.env.REACT_APP_HOST;

function PartnerCard(props) {

  const [data, setData] = useState([]);
  const [addElement, setAddElement] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [responsePartner, setResponsePartner] = useState([]);
  const [originalPartner, setOriginalPartner] = useState({});
  const [addPartner, setAddPartner] = useState({
    nameCompany: "",
    type: "",
    address: "",
    surnameDelegate: "",
    nameDelegate: "",
    patronymicDelegate: "",
    email: "",
    phoneNumber: "",
    dateConclusionContract: "",
    error: "",
  });

  useEffect(() => {
    axios.get(`http://${host}:5003/partners`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setData(error);
      })
  }, []);

  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    e.preventDefault();
    setAddPartner({
      ...addPartner,
      [e.target.name]: e.target.value,
    });
  }

  const { nameCompany, type, address, surnameDelegate, nameDelegate, patronymicDelegate, email, phoneNumber, dateConclusionContract } = addPartner;
  const error = useSelector((state) => state.partners.error)
  const topic = "Партнеры"

  const addingPartner = () => {
    if (!nameCompany || !type || !address || !surnameDelegate || !nameDelegate || !patronymicDelegate || !email || !phoneNumber || !dateConclusionContract) {
      const error = "Заполнены не все поля"
      console.log(error)
      dispatch(addPartnerFailure(error))
      return;
    }
    console.log(addPartner)
    dispatch(addNotify(addPartner.nameCompany, topic, actions.add))
    axios.post(`http://${host}:5003/partners/add`, {
      nameCompany,
      type,
      address,
      surnameDelegate,
      nameDelegate,
      patronymicDelegate,
      email,
      phoneNumber,
      dateConclusionContract,
    })
      .then((response) => {
        setResponsePartner(response.data);
        setAddPartner({
          nameCompany: "",
          type: "",
          address: "",
          surnameDelegate: "",
          nameDelegate: "",
          patronymicDelegate: "",
          email: "",
          phoneNumber: "",
          dateConclusionContract: "",
          error: "",
        });
      })
  }

  const cleanedPhoneNumber = (phoneNumber) => {
    if(phoneNumber) {
      return phoneNumber.replace(/[^+0-9]/g, "");
    }
  }

  const toggleEdit = (index) => {
    if (index === editIndex) {
      setEditIndex(-1);
    } else {
      setEditIndex(index);
    }
  };

  const handleChange = (event, index, field) => {
    const newData = [...data];
    newData[index][field] = event.target.value;
    setData(newData);
  };

  const addNewElement = (event) => {
    event.preventDefault()
    setAddElement(!addElement);
  }

  const handleSave = (index) => {
    const updatedPartner = data[index];
    dispatch(updatePartnerRequest());

    dispatch(editNotify(updatedPartner.nameCompany, topic, actions.edit));
    axios.post(`http://${host}:5003/partners/update`, updatedPartner)
    .then((response) => {
      dispatch(updatePartnerSuccess(response.data));
      setResponsePartner(response.data);
      toggleEdit(index);
    })
    .catch((error) => {
      dispatch(updatePartnerFailure(error.message));
      setResponsePartner(error);
    })

    console.log(updatedPartner)
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setData(data.map((partner, index) => index === editIndex ? originalPartner : partner));
  };

  const handleDelete = (id) => {
    dispatch(deletePartnerRequest());
    dispatch(deleteNotify(id, topic, actions.delete))
    axios.post(`http://${host}:5003/partners/delete`, {
      idPartner: id
    })
      .then((response) => {
        dispatch(deletePartnerSuccess(response.data));
        setResponsePartner(response.data);
        setAddPartner({
          nameCompany: "",
          type: "",
          address: "",
          surnameDelegate: "",
          nameDelegate: "",
          patronymicDelegate: "",
          email: "",
          phoneNumber: "",
          dateConclusionContract: "",
          error: "",
        });
      })
      .catch((error) => {
        dispatch(deletePartnerFailure(error.message));
      });
  };

  return (
    <div className="wrapperCards" style={{ background: "#F0F3FF" }}>

      {addElement ?
        (
          <button onClick={addNewElement} className="mainButtonAddDel buttonAdd"></button>
        ) : (
          <>
            <button onClick={addNewElement} className="mainButtonAddDel buttonDel"></button>
            <div className="addingAboutCard aboutCard">
              <div className="valuesCard">
                <p className="valueCard">Заполните следующие данные:</p>
                <input type="text" required name="nameCompany" placeholder="Название компании" className="inputValueCard" onChange={handleInputChange} />
                <input type="text" required name="type" placeholder="Тип партнера" className="inputValueCard" onChange={handleInputChange} />
                <input type="text" required name="address" placeholder="Физический адрес" className="inputValueCard" onChange={handleInputChange} />
                <p className="valueCard">Заполните данные о представителе</p>
                <input type="text" required name="surnameDelegate" placeholder="Фамилия" className="inputValueCard" onChange={handleInputChange} />
                <input type="text" required name="nameDelegate" placeholder="Имя" className="inputValueCard" onChange={handleInputChange} />
                <input type="text" required name="patronymicDelegate" placeholder="Отчество" className="inputValueCard" onChange={handleInputChange} />
                <input type="email" required name="email" placeholder="Рабочая почта" className="inputValueCard" onChange={handleInputChange} />
                <input type="text" required name="phoneNumber" placeholder="Номер телефона" className="inputValueCard" onChange={handleInputChange} />
                <input type="datetime-local" required name="dateConclusionContract" placeholder="Дата заключения контракта" className="inputValueCard" onChange={handleInputChange} />
                <p className="error">{error}</p>
                <p>Все поля являются обязательными</p>
              </div>
              <div className="wrapperButtons" style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <button onClick={() => addingPartner()} className="addButton headerButtonMain"></button>
              </div>
            </div>
          </>
        )}

      {data.map((partner, index) => {
        return (
          <div className="aboutCard">
            <div className="valuesCard">
              {editIndex === index ? (
                <>
                  <input type="text" value={partner.nameCompany} onChange={(event) => handleChange(event, index, "nameCompany")} placeholder="Название компании" className="inputValueCard"></input>
                  <input type="text" value={partner.type} onChange={(event) => handleChange(event, index, "type")} placeholder="Тип партнера" className="inputValueCard"></input>
                  <input type="text" value={partner.address} onChange={(event) => handleChange(event, index, "address")} placeholder="Физический адрес" className="inputValueCard"></input>
                  <p className="valueCard">Заполните данные о представителе</p>
                  <input type="text" value={partner.surnameDelegate} onChange={(event) => handleChange(event, index, "surnameDelegate")} placeholder="Фамилия" className="inputValueCard"></input>
                  <input type="text" value={partner.nameDelegate} onChange={(event) => handleChange(event, index, "nameDelegate")} placeholder="Имя" className="inputValueCard"></input>
                  <input type="text" value={partner.patronymicDelegate} onChange={(event) => handleChange(event, index, "patronymicDelegate")} placeholder="Отчество" className="inputValueCard"></input>
                  <input type="email" value={partner.email} onChange={(event) => handleChange(event, index, "email")} placeholder="Рабочая почта" className="inputValueCard"></input>
                  <input type="text" value={partner.phoneNumber} onChange={(event) => handleChange(event, index, "phoneNumber")} placeholder="Номер телефона" className="inputValueCard"></input>
                  <input type="datetime-local" value={partner.dateConclusionContract} onChange={(event) => handleChange(event, index, "dateConclusionContract")} placeholder="Дата заключения контракта" className="inputValueCard"></input>
                  <p>{error}</p>
                  <p>Все поля являются обязательными</p>
                </>
              ) : (
                <>
                  <p className="valueCard">{partner.nameCompany}</p>
                  <p className="valueCard">Тип партнера: {partner.type}</p>
                  <p className="valueCard">Физический адрес: {partner.address}</p>
                  <p className="cardRubric"> Представитель</p>
                  <p className="valueCard">Фамилия: {partner.surnameDelegate}</p>
                  <p className="valueCard">Имя: {partner.nameDelegate}</p>
                  <p className="valueCard">Отчество: {partner.patronymicDelegate}</p>
                  <p className="valueCard">Рабочая почта: {partner.email}</p>
                  <p className="valueCard">Номер телефона: {partner.phoneNumber}</p>
                  <p className="valueCard">Дата заключения контракта: {partner.dateConclusionContract}</p>
                </>
              )}
            </div>
            <div className="wrapperButtons">
              <div className="headerButtons">
                {editIndex === index ? (
                  <>
                    <button onClick={() => handleSave(index)} className="addButton headerButtonMain acceptButton"></button>
                    <button onClick={() => handleCancel(index)} className="contactButton headerButtonMain cancelButton"></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEdit(index)} className="contactButton headerButtonMain editButton"></button>
                    <button className="contactButton headerButtonMain deleteButton" onClick={() => handleDelete(partner.idPartner)}></button>
                  </>
                )}
              </div>
              <a href={`tel:${cleanedPhoneNumber(partner.phoneNumber)}`} className="contactButton">Связаться</a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default PartnerCard;