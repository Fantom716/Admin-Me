import React, { useEffect } from "react";
import Header from "../../components/header/ready header";
import Navigation from "../../components/nav/navigation";
import Desktop from "../../components/desktop/desktop";
import axios from "axios";
import { useState } from "react";


function HomeUser(props) {

  const [dataForInfoCard, setDataForInfoCard] = useState([
    {
      info: "",
      link: "",
    },
  ]);

  const [products, setProducts] = useState([
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

  const [test, setTest] = useState({});

  const id ={ data: localStorage.getItem("idUser") }

  axios.post(`http://localhost:5002/dashboard/user?id=${id.data}`, id)
    .then((response) => {

    })
    .catch((error) => {
      console.log(error)
    })
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
        .get("http://localhost:5002/dashboard/clients/products")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          setProducts(products["error"] = [error]);
        })
      axios
      .get("http://localhost:5002/dashboard/users/statisticCard")
      .then((response) => {
        console.log(response);
        setStatistic(response.data);
      })
      .catch((error) => {
        setStatistic(statistic["error"] = [error]);
        console.log(statistic["error"]);
      })
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Navigation name="Alexander" />
      <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
        <p>{props.text}</p>
        <Header name="Alexander" />
        <Desktop statistic={statistic} dataForInfoCard={dataForInfoCard} infoForMain={products} />
      </div>
    </div>
  )
}

export default HomeUser;