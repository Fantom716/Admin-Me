import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NotificationAccount from "../notifications/account";
import "../../styles/navigation.scss";

/* Info about links */

const linksNav = [
    {
        href: "/dashboard",
        icon: "/navigation/icons/home.svg",
        title: "Главная"
    },
    {
        href: "/clients",
        icon: "/navigation/icons/clients.svg",
        title: "Клиенты",
    },
    {
        href: "/orders",
        icon: "/navigation/icons/orders.svg",
        title: "Заказы"
    },
    {
        href: "/sells",
        icon: "/navigation/icons/sells.svg",
        title: "Продажи",
    },
    {
        href: "/partners",
        icon: "/navigation/icons/partners.svg",
        title: "Партнеры",
    },
    {
        href: "/products",
        icon: "/navigation/icons/products.svg",
        title: "Продукты",
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

    return (
        <nav className={isActive ? "navActive" : "navDisable"}>
            <div className={"navHeader"}>
                <p className={isActive ? "navTitleActive" : "navTitleDisable"}>Admin</p>
                <button className="buttonNav" onClick={Change}>
                    {isActive ? hideMenu : showMenu}
                </button>
            </div>
                <ul className="nav__list">
                    {linksNav.map((item, idx) =>
                        <li key={idx} className="navItem">
                            <NavLink className={isActive ? "navLinkActive" : "navLinkDisable"} to={item.href}>
                                <img src={item.icon} className={isActive ? "iconSectionActive" : "iconSectionDisable"}></img>
                                <p className={isActive ? "linkTitleActive" : "linkTitleDisable"}>{item.title}</p>
                            </NavLink>
                        </li>)}
                </ul>
            <button className="nav__footer" onClick={openMenu}>
                <p className={isActive ? "navUsernameActive" : "navUsernameDisable"}>{localStorage.getItem("user")}</p>
                <NotificationAccount openMenu={menuActive} name={isActive}/>
                <img src="/navigation/image/Avatar.svg" alt="User avatar" />
            </button>
        </nav>
    )
}

export default Navigation;