import React, { useEffect, useState } from "react";
import logo from "../../../assets/icon/main_logo.svg";
import registerImage from "../../../assets/icon/register.svg";
import loginImage from "../../../assets/icon/login.svg";
import menuForMobile from "../../../assets/icon/menu_for_mobile.svg";
import closeMenu from "../../../assets/icon/close_menu.svg";

import Divider from "../../Common/divider/Divider";

import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <>
            <div className="landing-header">
                <div className="menu-for-mobile">
                    <img
                        className={`menu-for-mobile-first-img ${isMenuOpen ? "hidden" : ""}`}
                        src={menuForMobile}
                        alt="Меню"
                        onClick={toggleMenu}
                    />
                    <img
                        className={`menu-for-mobile-second-img ${isMenuOpen ? "" : "hidden"}`}
                        src={closeMenu}
                        alt="Закрити меню"
                        onClick={toggleMenu}
                    />
                </div>
                <Link to="/" className="landing-header-logo">
                    <img src={logo} alt="Logo" />
                    <div className="landing-header-logo-text">BookCat</div>
                </Link>
                <nav className="navigation">
                    <ul className="navigation-list">
                        <li><Link to="/blog">Блог</Link></li>
                        <li><Link to="/blog/pricing">Ціноутворення</Link></li>
                        <li><Link to="/blog/help">Довідка</Link></li>
                    </ul>
                </nav>
                <div className="landing-header-reg-and-log">
                    {/* <Link to="/register" className="landing-header-register">
                    <div className="landing-header-register-text">Зареєструватися</div>
                    <img src={registerImage} alt="Register" />
                </Link>
                <Divider type="second" /> */}
                    <Link to="/login" className="landing-header-login">
                        <div className="landing-header-login-text">Увійти</div>
                        <img src={loginImage} alt="Login" />
                    </Link>
                </div>
            </div>
            <aside id="menu" className={isMenuOpen ? "" : "hidden"}>
                <nav className="navigation-for-mobile">
                    <ul className="navigation-for-mobile-list">
                        <li><Link to="/blog">Блог</Link></li>
                        <li><Link to="/blog/pricing">Ціноутворення</Link></li>
                        <li><Link to="/blog/help">Довідка</Link></li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Header;