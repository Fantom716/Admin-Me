import React, { useState } from "react";
import "../../styles/desktop.scss";
import { useDispatch, useSelector } from "react-redux";
import { readNotificationD } from "../redux/desktop/actions";

function WarningDesktop(props) {
  const dispatch = useDispatch();
  const readWarning = useSelector((state) => state.desktop.read);

  function closeWarning() {
    dispatch(readNotificationD());
  }

  return (
    <div
      className="warningDesktop"
      style={readWarning === false ? { display: "none" } : {}}
    >
      <div className="wrapperText">
        <img
          src="/workDisplay/warning.svg"
          alt="warning"
          style={{ display: "block", width: "100%", maxWidth: "40px" }}
        />
        <p className="textWarning">
          Для отображения измененных/добавленных записей необходимо обновить страницу.
        </p>
      </div>
      <button className="closeWarningButton" onClick={closeWarning} />
    </div>
  );
}

export default WarningDesktop;
