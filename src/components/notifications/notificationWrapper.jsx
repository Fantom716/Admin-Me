import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/pop-up\'s/notifys.scss'
import { clearNotifys, reverseNotyfi, removeNotify } from "../redux/notifications/actions";

function NotificationWrapper() {
  const dispatch = useDispatch();
  const notifys = useSelector((state) => state.notifys.notifications);
  const store = useSelector((state) => state)
  console.log(store)

  const clearNotifyses = () => {
    dispatch(clearNotifys())
  }

  return (
    <>
      <div className="notificationWrapper" style={notifys.length > 0 ? { justifyContent: "space-between" } : { justifyContent: "center" }}>
        <div className="wrapperItems">
          {[...notifys].reverse().map((notify, index) => (
            <div className={`notifyWrapper notifyWrapper${index === notifys.length - 1 ? "End" : ""}`} key={notify.id}>
              <img className="notifyImg" src={notify.icon} alt="" />
              <div className="mainDataNotify">
                <p className="textItem">Элемент <span className="boldText">{notify.element}</span> {notify.action} {notify.action === "удален" ? "из раздела" : "в разделе"} <span className="boldText">{notify.topic}</span></p>
                <p className="textTime">{notify.time}</p>
              </div>
              <div className="deleteNotifyIcon">
                <svg onClick={() => dispatch(removeNotify(notify.id))} className="deleteNotifySvg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M8.33333 23.3333L14.2331 27.7581C14.6618 28.0797 15.2677 28.0061 15.607 27.5914L30 10" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        {notifys.length === 0 ? (
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