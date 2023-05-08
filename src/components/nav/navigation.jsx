import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NotificationAccount from "../pop-up's/account";
import "../../styles/navigation.scss";

/* Info about links */

const linksNavManager = [
  {
    href: `/manager/${localStorage.getItem("idUser")}/dashboard`,
    icon: "/navigation/icons/home.svg",
    title: "Главная"
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/clients`,
    icon: "/navigation/icons/clients.svg",
    title: "Клиенты",
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/orders`,
    icon: "/navigation/icons/orders.svg",
    title: "Заказы"
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/sells`,
    icon: "/navigation/icons/sells.svg",
    title: "Продажи",
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/partners`,
    icon: "/navigation/icons/partners.svg",
    title: "Партнеры",
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/products`,
    icon: "/navigation/icons/products.svg",
    title: "Продукты",
  }
]

const linksNavClient = [
  {
    href: `/user/${localStorage.getItem("idUser")}/dashboard`,
    icon: "/navigation/icons/home.svg",
    title: "Главная"
  },
  {
    href: `/user/${localStorage.getItem("idUser")}/orders`,
    icon: "/navigation/icons/orders.svg",
    title: "Мои заказы"
  },
  {
    href: `/user/${localStorage.getItem("idUser")}/profile`,
    icon: "/navigation/icons/sells.svg",
    title: "Мой профиль"
  }
]

const linksNavAdmin = [
  {
    href: `/admin/${localStorage.getItem("idUser")}/dashboard`,
    icon: "/navigation/icons/home.svg",
    title: "Главная"
  },
  {
    href: `/admin/${localStorage.getItem("idUser")}/users`,
    icon: "/navigation/icons/orders.svg",
    title: "Пользователи"
  },
  {
    href: `/admin/${localStorage.getItem("idUser")}/versions`,
    icon: "/navigation/icons/sells.svg",
    title: "Версии"
  }
]

const hideMenu = <svg width="49" height="49" viewBox="0 0 49 49" fill="none"><path d="M10.2084 14.2917H38.7917" stroke="#222222" stroke-linecap="round" /><path d="M10.2084 24.5H30.625" stroke="#222222" stroke-linecap="round" /><path d="M10.2084 34.7083H22.4584" stroke="#222222" stroke-linecap="round" /></svg>
const showMenu = <svg width="49" height="49" viewBox="0 0 49 49" fill="none"><path d="M10.2084 14.2917H38.7917" stroke="#222222" stroke-linecap="round" /><path d="M10.2084 24.5H38.7917" stroke="#222222" stroke-linecap="round" /><path d="M10.2084 34.7083H38.7917" stroke="#222222" stroke-linecap="round" /></svg>



/* Output links */


function Navigation() {

  const [isActive, setActive] = useState("false");
  const [menuActive, setMenu] = useState("false");

  function Change() {
    setActive(!isActive);
  }

  function openMenu() {
    setMenu(!menuActive);
  }

  console.log(window.location.pathname)

  function test() {
    if (window.location.pathname.match("/manager/.*")) {
      return (
        <ul className="nav__list">
          {linksNavManager.map((item, idx) =>
            <li key={idx} className="navItem">
              <NavLink className={isActive ? "navLinkActive" : "navLinkDisable"} to={item.href}>
                <img src={item.icon} className={isActive ? "iconSectionActive" : "iconSectionDisable"}></img>
                <p className={isActive ? "linkTitleActive" : "linkTitleDisable"}>{item.title}</p>
              </NavLink>
            </li>)}
        </ul>
      )
    }
    else if (window.location.pathname.match("/user/.*")) {
      return (
        <ul className="nav__list">
          {linksNavClient.map((item, idx) =>
            <li key={idx} className="navItem">
              <NavLink className={isActive ? "navLinkActive" : "navLinkDisable"} to={item.href}>
                <img src={item.icon} className={isActive ? "iconSectionActive" : "iconSectionDisable"}></img>
                <p className={isActive ? "linkTitleActive" : "linkTitleDisable"}>{item.title}</p>
              </NavLink>
            </li>)}
        </ul>
      )
    }
    else if (window.location.pathname.match("/admin/.*")) {
      return (
        <ul className="nav__list">
          {linksNavAdmin.map((item, idx) =>
            <li key={idx} className="navItem">
              <NavLink className={isActive ? "navLinkActive" : "navLinkDisable"} to={item.href}>
                <img src={item.icon} className={isActive ? "iconSectionActive" : "iconSectionDisable"}></img>
                <p className={isActive ? "linkTitleActive" : "linkTitleDisable"}>{item.title}</p>
              </NavLink>
            </li>)}
        </ul>
      )
    }
  }

  return (
    <nav className={isActive ? "navActive" : "navDisable"}>
      <div className={"navHeader"}>
        <p className={isActive ? "navTitleActive" : "navTitleDisable"}>Admin</p>
        <button className="buttonNav" onClick={Change}>
          {isActive ? hideMenu : showMenu}
        </button>
      </div>
      {test()}
      <button className="nav__footer" onClick={openMenu}>
        <p className={isActive ? "navUsernameActive" : "navUsernameDisable"}>{localStorage.getItem("login")}</p>
        <NotificationAccount openMenu={menuActive} name={isActive} />
        <img src="/navigation/image/Avatar.svg" alt="User avatar" />
      </button>
    </nav>
  )
}

export default Navigation;