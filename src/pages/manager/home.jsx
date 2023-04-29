import React, { useEffect } from "react";
import Header from "../../components/header/ready header";
import Navigation from "../../components/nav/navigation";
import Desktop from "../../components/desktop/desktop";
import axios from "axios";
import { useState } from "react";
import ProductCard from "../../components/cards/big card/productCard";


function HomeManager(props) {

  const [dataForInfoCard, setDataForInfoCard] = useState([
    {
      info: "",
      link: "",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      titleProduct: "",
      descriptionProduct: "",
    }
  ])

  const [statistic, setStatistic] = useState([
    {
      nameTable: "",
      fieldInDB: "",
      name: "",
      currentValue: 0,
      lastValue: 0,
      percentageState: 0,
      image: "",
    },
  ])

  useEffect(() => {
    axios
      .get("http://localhost:5001/dashboard/managers/infoCard")
      .then((response) => {
        setDataForInfoCard(response.data);
      })
      .catch((error) => {
        setDataForInfoCard(dataForInfoCard["error"] = [error]);
      });
      axios
        .get("http://localhost:5001/dashboard/manager/orders")
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          setOrders(orders["error"] = [error]);
        })
      axios.
      get("http://localhost:5001/dashboard/managers/statisticCard")
      .then((response) => {
        console.log(response);
        setStatistic(response.data);
      })
      .catch((error) => {
        setStatistic(statistic["error"] = [error]);
        console.log(statistic["error"]);
      })
  }, []);

  console.log(orders);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Navigation name="Alexander" />
      <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
        <p>{props.text}</p>
        <Header name="Alexander" />
        <Desktop statistic={statistic} dataForInfoCard={dataForInfoCard} infoForMain={orders} />
      </div>
    </div>
  )
}

export default HomeManager;