import React from "react";

function Notify(props) {

  const item = props.item

  return (
    <div className="notifyWrapper" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }} key={item.id}>
      <img style={{ width: "50px", marginRight: "20px" }} src={item.icon} alt="" />
      <p className="textItem">{item.data}</p>
    </div>
  )
}
export default Notify