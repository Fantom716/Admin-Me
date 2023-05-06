import React from "react";
import "../../../styles/cardManager.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function ClientCard(props) {

  const [data, setData] = useState([]);
  const [addElement, setAddElement] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [otherData, setOtherData] = useState([]);
  const [originalClient, setOriginalClient] = useState([]);
  const [addClient, setAddClient] = useState({
    surname: "",
    name: "",
    patronimyc: "",
    dateBirthday: "",
    phoneNumber: "",
    passportInfo: "",
    rating: 0,
    error: ""
  });

  const [responseAddClient, setResponseAddClient] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5015/clients")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setData(error);
      })
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setAddClient({
      ...addClient,
      [e.target.name]: e.target.value,
    });
  }

  const { surname, name, patronimyc, dateBirthday, phoneNumber, passportInfo, rating, error } = addClient;

  const setText = (event) => {
    setAddClient({ ...addClient, error: event.target.value });
  }

  const addingClient = (e) => {
    e.preventDefault();
    if (!surname || !name || !patronimyc || !dateBirthday || !phoneNumber || !passportInfo || !rating) {
      setAddClient({ ...addClient, error: "Заполнены не все поля" });
      return;
    }
    axios.post("http://localhost:5015/clients/add", addClient)
      .then((response) => {
        setResponseAddClient(response.data);
        setAddClient({
          surname: "",
          name: "",
          patronimyc: "",
          dateBirthday: "",
          phoneNumber: "",
          passportInfo: "",
          rating: "",
          error: "",
        });
      })
      .catch((error) => {
        setAddClient({ ...addClient, error: error });
      })
  }

  const cleanedPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/\D/g, "");
  }

  const toggleEdit = (index) => {
    setOriginalClient(data[index]);
    console.log(originalClient)
    if (index === editIndex) {
      setEditIndex(-1);
    } else {
      setEditIndex(index);
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setData(data.map((client, index) => index === editIndex ? originalClient : client));
  };

  const handleChange = (event, index, field) => {
    setOriginalClient(data[index]);
    const newData = [...data];
    newData[index][field] = event.target.value;
    setData(newData);
  };

  const handleSave = (index) => {
    const updatedClient = data[index];

    axios.post(`http://localhost:5015/clients/update`, updatedClient)
      .then((response) => {
        setResponseAddClient(response.data);
        toggleEdit();
      })
      .catch((error) => {
        setResponseAddClient(error);
      });
    console.log(updatedClient)
  };

  const addNewElement = (event) => {
    event.preventDefault()

    setAddElement(!addElement);
  }

  return (
    <div className="wrapperCards" style={{ background: "#F0F3FF" }}>

      {addElement ?
        (
          <button onClick={addNewElement} className="mainButtonAddDel buttonAdd"></button>
        ) : (
          <>
            <button onClick={addNewElement} className="mainButtonAddDel buttonDel"></button>
            <div className="addingAboutCard aboutCard">
              <div className="inputValuesCard valuesCard">
                <p className="valueCard">Заполните следующие данные:</p>
                <input type="text" required placeholder="Фамилия" className="inputValueCard" name="surname" onChange={handleInputChange}></input>
                <input type="text" required placeholder="Имя" className="inputValueCard" name="name" onChange={handleInputChange}></input>
                <input type="text" required placeholder="Отчество" className="inputValueCard" name="patronimyc" onChange={handleInputChange}></input>
                <input type="date" required placeholder="Дата рождения" className="inputValueCard" name="dateBirthday" onChange={handleInputChange}></input>
                <input type="text" required placeholder="Номер телефона" className="inputValueCard" name="phoneNumber" onChange={handleInputChange}></input>
                <input type="text" required placeholder="Паспортные данные" className="inputValueCard" name="passportInfo" onChange={handleInputChange}></input>
                <input type="number" required placeholder="Начальный рейтинг" className="inputValueCard" name="rating" onChange={handleInputChange}></input>
                <p onChange={setText} className="error">{error}</p>
                <p>Все поля являются обязательными</p>
              </div>
              <div className="wrapperButtons" style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <button className="cancelButton headerButtonMain"></button>
                <button onClick={addingClient} className="addButton headerButtonMain"></button>
              </div>
            </div>
          </>
        )}

      {data.map((client, index) => {
        return (
          <div className="aboutCard" key={client.id}>
            <div className="valuesCard">
              {editIndex === index ? (
                <>
                  <input type="text" className="inputValueCard" value={client.surname} onChange={(event) => handleChange(event, index, "surname")} />
                  <input type="text" className="inputValueCard" value={client.name} onChange={(event) => handleChange(event, index, "name")} />
                  <input type="text" className="inputValueCard" value={client.patronimyc} onChange={(event) => handleChange(event, index, "patronimyc")} />
                  <input type="date" className="inputValueCard" value={client.dateBirthday} onChange={(event) => handleChange(event, index, "dateBirthday")}></input>
                  <input type="text" className="inputValueCard" value={client.phoneNumber} onChange={(event) => handleChange(event, index, "phoneNumber")}></input>
                  <input type="text" className="inputValueCard" value={client.passportInfo} onChange={(event) => handleChange(event, index, "passportInfo")}></input>
                  <input type="number" className="inputValueCard" value={client.rating} onChange={(event) => handleChange(event, index, "rating")}></input>
                </>
              ) : (
                <>
                  <p className="valueCard"> {client.surname} {client.name} {client.patronimyc} </p>
                  <p className="valueCard">Дата рождения: {client.dateBirthday}</p>
                  <p className="valueCard">Номер телефона: {client.phoneNumber}</p>
                  <p className="valueCard">Паспортные данные: {client.passportInfo}</p>
                  <p className="valueCard">Рейтинг: {client.rating}</p>
                </>
              )}
            </div>
            <div className="wrapperButtons">
              <div className="headerButtons headerButtonsClients">
                {editIndex === index ? (
                  <>
                    <button onClick={() => handleSave(index)} className="contactButton headerButtonMain editButton"></button>
                    <button onClick={() => handleCancel(index)} className="contactButton headerButtonMain cancelButton"></button>
                  </>
                ) : (
                  <button onClick={() => toggleEdit(index)} className="contactButton headerButtonMain editButton"></button>
                )}
              </div>
              {/* <a href={`tel:${cleanedPhoneNumber(client.phoneNumber)}`} tabIndex={0} className="contactButton">
                Связаться
              </a> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ClientCard;