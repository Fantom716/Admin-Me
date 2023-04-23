import React, { useEffect } from "react";
import Header from "../components/header/assemblyHeader/ready header";
import Navigation from "../components/nav/navigation";
import Desktop from "../components/desktop/desktop";
import axios from "axios";
import { useState } from "react";


function Home(props) {

  const [data, setData] = useState([
    {
      login: "",
      email: "",
    },
  ]);

  const [statistic, setStatistic] = useState([
    {
      name: "",
      value: 0,
    },
    {
      name: "",
      value: 0,
    },
    {
      name: "",
      value: 0,
    }
  ])

  console.log("1" + statistic[0].image);
  useEffect(() => {
    axios
      .get("http://localhost:5001/dashboard/managers")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log("2" + statistic[0].image);
    axios.get("http://localhost:5001/dashboard/statistic").then((response) => {
      setStatistic(response.data);
    })
  }, []);

  data.map((item) => {
    console.log(item)
  })


  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Navigation name="Alexander" />
      <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
        <p>{props.text}</p>
        <Header name="Alexander" />
        <Desktop statistic={statistic} data={data} />
      </div>
    </div>
  )
}

export default Home;