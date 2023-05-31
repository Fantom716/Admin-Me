import { useDispatch, useSelector } from "react-redux";
import { clearNotifys, removeNotify } from "../redux/notifications/actions";
import '../../styles/pop-up\'s/notifys.scss'

function NotificationWrapper(props) {
  const dispatch = useDispatch();

  const clearNotifyses = () => {
    dispatch(clearNotifys())
  }

  // The text property is available only for tickets

  const TextItem = ({ notify }) => {
    if (notify.hasOwnProperty("error")) {
      return (
        <>
          <p className="textItem">Ошибка {notify.action} элемента <span className="boldText">{notify.element}</span> из раздела <span className="boldText">{notify.topic}</span>
          </p>
          <p className="texxTime">{notify.time}</p>
        </>
      )
    } else if (notify.hasOwnProperty("text")) {
      return (
        <>
          <p className="textItem">{notify.text}</p>
          <p className="textTime">{notify.time}</p>
        </>
      );
    } else {
      return (
        <>
          <p className="textItem">Элемент
            <span className="boldText"> {notify.element}</span> {notify.action} {notify.action === "удален" ? "из раздела" : "в разделе"}
            <span className="boldText"> {notify.topic}</span>
          </p>
          <p className="textTime">{notify.time}</p>
        </>
      );
    }
  };


  return (
    <>
      <div className="notificationWrapper" style={props.notys.length > 0 ? { justifyContent: "space-between" } : { justifyContent: "center" }}>
        <div className="wrapperItems">
          {[...props.notys].reverse().map((notify, index) => (
            <div className={`notifyWrapper notifyWrapper${index === props.notys.length - 1 ? "End" : ""}`} key={notify.id}>
              <img className="notifyImg" src={notify.icon} alt="" />
              <div className="mainDataNotify">
                {notify.user.id === localStorage.getItem("idUser") ? (
                  <TextItem notify={notify} />
                ) : (
                  <></>
                )}
              </div>
              <div className="deleteNotifyIcon">
                <svg onClick={() => dispatch(removeNotify(notify.id))} className="deleteNotifySvg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M8.33333 23.3333L14.2331 27.7581C14.6618 28.0797 15.2677 28.0061 15.607 27.5914L30 10" stroke="#9F9F9F" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        {props.notys.length === 0 ? (
          <p className="noNotify" style={{ textAlign: "center" }}>Уведомлений нет</p>
        ) : (
          <div className="wrapperButtonsNotify" style={{ display: "block" }}>
            <button onClick={() => clearNotifyses()} className="clearButtonNotifys">Очистить</button>
          </div>
        )}
      </div>
    </>
  );
}

export default NotificationWrapper;
