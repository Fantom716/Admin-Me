import React from "react";
import Navigation from "../../components/nav/navigation";
import Header from "../../components/header/ready header";
import Desktop from "../../components/desktop/desktop";
import axios from "axios";
import { useEffect, useState } from "react";
import { greetingElement } from "../../components/header/greeting";
const host = process.env.REACT_APP_HOST;

function HomeAdmin() {

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
          .get(`http://${host}:5021/dashboard/admin/infoCard`)
          .then((response) => {
            setDataForInfoCard(response.data);
          })
          .catch((error) => {
            setDataForInfoCard(dataForInfoCard["error"] = [error]);
          });
          axios
            .get(`http://${host}:5021/dashboard/admin/users`)
            .then((response) => {
              setOrders(response.data);
            })
            .catch((error) => {
              setOrders(orders["error"] = [error]);
            })
          axios.
          get(`http://${host}:5021/dashboard/admin/statisticCard`)
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
      console.log(dataForInfoCard);

    return (
        <div style={{ display: "flex", height: "100vh"}}>
            <Navigation />
            <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
                <Header title={greetingElement()} isDashboard="yes" />
                <Desktop statistic={statistic} dataForInfoCard={dataForInfoCard} infoForMain={orders} />
            </div>
        </div>
    )
}

export default HomeAdmin;