import React from "react";
import "../../../styles/cards.scss"

function BigCard(props) {
  const percentageState = +props.data.percentageState;
  const isInvalidPercentageState = isNaN(percentageState) || percentageState <= 0;

  return (
    <div className="wrapperCard">
      {props.data.name === "AxiosError" ? (
        <p style={{ color: "red", fontSize: "1.1rem", textAlign: "center", lineHeight: "1.5rem" }}>Ошибка получения статистических данных, проверьте соединение с сервером</p>
      ) : (
        <>
          <div className="headerCard">
            <div className="header__icon">
              <img className="headerImage" src={props.data.image} alt={props.data.alt} />
            </div>
            <div className="header__statistic">
              {props.data.percentageState !== undefined ? (
                <div className="headerPersentageWrapper">
                  {isInvalidPercentageState ? <img className="headerArrow" src="/card/icons/Arrow bottom.svg" alt="" /> : (
                    percentageState === Infinity || percentageState === 0 ? null : <img className="headerArrow" src="/card/icons/Arrow up.svg" alt="" />
                  )}
                  <p style={isInvalidPercentageState ? { color: "#FF0000" } : (percentageState === 0 ? { color: "#000000" } : { color: "#8bf705" })} className="headerPersentageTitle">{isInvalidPercentageState ? '0%' : (percentageState === Infinity ? '0%' : props.data.percentageState + "%")}</p>
                </div>
              ) : null}
              {props.data.percentageState !== undefined ? (
                <p className="headerTime">За неделю</p>
              ) : null}
            </div>
          </div>
          <div className="footer__card">
            <p className="footerSubtitle">{props.data.name}</p>
            <p className="footerCount">{props.data.currentValue}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default BigCard;
