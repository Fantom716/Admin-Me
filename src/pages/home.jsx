import React, { useEffect } from "react";
import Header from "../components/header/assemblyHeader/ready header";
import Navigation from "../components/nav/navigation";
import Desktop from "../components/desktop/desktop";
import axios from "axios";
import { useState } from "react";


function Home(props) {

  const [dataManagers, setDataManagers] = useState([
    {
      login: "",
      email: "",
    },
  ]);

  const [statistic, setStatistic] = useState([
    {
      nameTable: "",
      fieldInDB: "",
      name: "",
      currentValue: 0,
      lastValue: 0,
      percentageState: "",
      image: "",
    },
  ])

  useEffect(() => {
    axios
      .get("http://localhost:5001/dashboard/managers")
      .then((response) => {
        setDataManagers(response.data);
      })
      .catch((error) => {
        setDataManagers(dataManagers["error"] = [error]);
      });
    axios.
      get("http://localhost:5001/dashboard/statistic")
      .then((response) => {
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
        <Desktop statistic={statistic} dataManagers={dataManagers} />
      </div>
    </div>
  )
}

export default Home;