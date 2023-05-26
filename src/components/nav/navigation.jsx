import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import NotificationAccount from "../pop-up's/account";
import "../../styles/navigation.scss";
import { useDispatch, useSelector } from "react-redux";
import { isActiveMenu } from "../redux/navigation/actions";
/* Info about links */

export const linksNavManager = [
  {
    href: `/manager/${localStorage.getItem("idUser")}/dashboard`,
    icon: "/navigation/icons/home.svg",
    alt: "home",
    title: "Главная"
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/clients`,
    icon: "/navigation/icons/manager/clients.svg",
    alt: "clients",
    title: "Клиенты",
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/orders`,
    icon: "/navigation/icons/manager/orders.svg",
    alt: "orders",
    title: "Заказы"
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/sells`,
    icon: "/navigation/icons/manager/sells.svg",
    alt: "sells",
    title: "Продажи",
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/partners`,
    icon: "/navigation/icons/manager/partners.svg",
    alt: "partners",
    title: "Партнеры",
  },
  {
    href: `/manager/${localStorage.getItem("idUser")}/products`,
    icon: "/navigation/icons/manager/products.svg",
    alt: "products",
    title: "Продукты",
  }
]

export const linksNavClient = [
  {
    href: `/user/${localStorage.getItem("idUser")}/dashboard`,
    icon: "/navigation/icons/home.svg",
    alt: "home",
    title: "Главная"
  },
  {
    href: `/user/${localStorage.getItem("idUser")}/orders`,
    icon: "/navigation/icons/user/orders.svg",
    alt: "orders",
    title: "Мои заказы"
  },
  {
    href: `/user/${localStorage.getItem("idUser")}/profile`,
    icon: "/navigation/icons/user/profile.svg",
    alt: "profile",
    title: "Мой профиль"
  }
]

export const linksNavAdmin = [
  {
    href: `/admin/${localStorage.getItem("idUser")}/dashboard`,
    icon: "/navigation/icons/home.svg",
    alt: "home",
    title: "Главная"
  },
  {
    href: `/admin/${localStorage.getItem("idUser")}/users`,
    icon: "/navigation/icons/admin/users.svg",
    alt: "users",
    title: "Пользователи"
  },
  {
    href: `/admin/${localStorage.getItem("idUser")}/versions`,
    icon: "/navigation/icons/admin/versions.svg",
    alt: "versions",
    title: "Версии системы"
  }
]

const hideMenu = <svg width="49" height="49" viewBox="0 0 49 49" fill="none"><path d="M10.2084 14.2917H38.7917" stroke="#222222" stroke-linecap="round" /><path d="M10.2084 24.5H30.625" stroke="#222222" stroke-linecap="round" /><path d="M10.2084 34.7083H22.4584" stroke="#222222" stroke-linecap="round" /></svg>
const showMenu = <svg width="49" height="49" viewBox="0 0 49 49" fill="none"><path d="M10.2084 14.2917H38.7917" stroke="#222222" stroke-linecap="round" /><path d="M10.2084 24.5H38.7917" stroke="#222222" stroke-linecap="round" /><path d="M10.2084 34.7083H38.7917" stroke="#222222" stroke-linecap="round" /></svg>

/* Output links */

function Navigation() {

  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isActiveMenuSel = selector.nav.active
  console.log(selector)
  const [isActive, setActive] = useState("false");
  const [menuActive, setMenu] = useState("false");

  function Change() {
    setActive(!isActive);
    console.log(isActive)
    dispatch(isActiveMenu(isActive))
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
              <NavLink title={item.title} className={isActiveMenuSel ? "navLinkActive" : "navLinkDisable"} to={item.href}>
                <img alt={item.alt} src={item.icon} className={isActiveMenuSel ? "iconSectionActive" : "iconSectionDisable"}></img>
                <p className={isActiveMenuSel ? "linkTitleActive" : "linkTitleDisable"}>{item.title}</p>
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
              <NavLink title={item.title} className={isActiveMenuSel ? "navLinkActive" : "navLinkDisable"} to={item.href}>
                <img alt={item.alt} src={item.icon} className={isActiveMenuSel ? "iconSectionActive" : "iconSectionDisable"}></img>
                <p className={isActiveMenuSel ? "linkTitleActive" : "linkTitleDisable"}>{item.title}</p>
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
              <NavLink title={item.title} className={isActiveMenuSel ? "navLinkActive" : "navLinkDisable"} to={item.href}>
                <img alt={item.alt} src={item.icon} className={isActiveMenuSel ? "iconSectionActive" : "iconSectionDisable"}></img>
                <p className={isActiveMenuSel ? "linkTitleActive" : "linkTitleDisable"}>{item.title}</p>
              </NavLink>
            </li>)}
        </ul>
      )
    }
  }

  return (
    <nav className={isActiveMenuSel ? "navActive" : "navDisable"}>
      <div className={"navHeader"}>
        <p className={isActiveMenuSel ? "navTitleActive" : "navTitleDisable"}>Admin</p>
        <button className="buttonNav" onClick={Change}>
          {isActiveMenuSel ? hideMenu : showMenu}
        </button>
      </div>
      {test()}
      <button className={isActiveMenuSel ? "nav__footerActive" : "nav__footer"} onClick={openMenu}>
        <p className={isActiveMenuSel ? "navUsernameActive" : "navUsernameDisable"}>{localStorage.getItem("login")}</p>
        <NotificationAccount openMenu={menuActive} name={isActiveMenuSel} />
        <img src="/navigation/image/Avatar.svg" alt="User avatar" />
      </button>
    </nav>
  )
}

export default Navigation;