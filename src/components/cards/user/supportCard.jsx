import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../styles/support.scss"
import { submitTicket } from "../../redux/users/actions";
import { useDispatch } from "react-redux";
import { sumbitTicketNotify } from "../../redux/notifications/actions";

function SupportCard() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    axios
    .get("http://localhost:5030/supportUser")
    .then((res) => {
        setData(res.data);
      })
    .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data)

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("idUser")
    if (title && text) {
      dispatch(sumbitTicketNotify("dyegyde"))
      axios.post("http://localhost:5030/support", {id, title, text} )
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        )
    }
    console.log(title)
    console.log(text)
  };

  return (
    <div className="wrapperFormSupport">
      <form className="formSupport" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Тема тикета"
          className="inputSupport"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <textarea
          type="text"
          name="text"
          placeholder="Текст тикета"
          className="textAreaSupport"
          value={text}
          onChange={handleTextChange}
          required
        />
      </form>
      <button onClick={handleSubmit} className="buttonSubmitSupport">Отправить тикет</button>
      <div className="allTickets">
        <div className="headerTickets">
          <p className="yourTicket">Ваши тикеты</p>
        </div>
        {data.map((item, index) => {
          return(
            <div className="ticketWrapper">
              <p className="textTicket">Название тикета: {item.title}</p>
              <p className="textTicket">Описание проблемы: {item.descriptionProblem}</p>
              <p className="textTicket">Дата создания тикета: {item.dateOfApplication}</p>
              <p className="textTicket">Статус тикета: {item.status}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default SupportCard;