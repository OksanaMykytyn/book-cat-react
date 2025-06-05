import React, { useState, useEffect } from "react";
import './Navbar.css';

import logo from '../../../assets/icon/main_logo.svg';
import arrow from '../../../assets/icon/arrow.svg';
import arrowForMenu from '../../../assets/icon/arrow_for_menu.svg';
import darkTheme from '../../../assets/icon/dark_theme.svg';

import { Link } from "react-router-dom";

const NavbarAdmin = ({ isOpen, onClose }) => {

    const closeMenu = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="navbar" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="arrow-for-close-menu" onClick={closeMenu}>
                <img src={arrowForMenu} alt="Close Menu" />
            </div>
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
                <div className="navbar-logo-text">BookCat</div>
            </div>
            <div className="navbar-menu">
                <div className="navbar-catalog">
                    <div className="navbar-catalog-title">Користувачі</div>
                    <ul>
                        <li>
                            <Link to="/dashboard-admin/in-waiting">
                                <div className="navbar-item-li">В очікуванні</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard-admin/list-users">
                                <div className="navbar-item-li">Список користувачів</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard-admin/banned-users">
                                <div className="navbar-item-li">Заборгованості</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-report">
                    <div className="navbar-report-title">Підтримка</div>
                    <ul>
                        <li>
                            <Link to="/dashboard-admin/chats">
                                <div className="navbar-item-li">Чати</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-another">
                    <div className="navbar-another-title">Інше</div>
                    <ul>
                        <li>
                            <Link to="/dashboard-admin/settings">
                                <div className="navbar-item-li">Налаштування</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <div className="navbar-item-li">Темна тема</div>
                                <img src={darkTheme} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/dashboard-admin/documentation">
                                <div className="navbar-item-li">Довідка</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavbarAdmin;
