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

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const dataM = data.map((item) => console.log("OBJ:" + item.login));
  const logins = data.map((item) => item.login);
  const emails = data.map((item) => item.email);


    return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Navigation name="Alexander" />
      <div className='mainContent' style={{ padding: "32px", width: "100vw", background: "#F0F3FF", overflow: "auto" }}>
        <p>{props.text}</p>
        <Header name="Alexander" />
        <Desktop data={data} />
      </div>
    </div>
  )
}

export default Home;