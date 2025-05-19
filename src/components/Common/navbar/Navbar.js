import React, { useState, useEffect } from "react";
import './Navbar.css';

import logo from '../../../assets/icon/main_logo.svg';
import arrow from '../../../assets/icon/arrow.svg';
import arrowForMenu from '../../../assets/icon/arrow_for_menu.svg';
import darkTheme from '../../../assets/icon/dark_theme.svg';

import { Link } from "react-router-dom";

const Navbar = ({ isOpen, onClose }) => {

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
                    <div className="navbar-catalog-title">Каталог</div>
                    <ul>
                        <li>
                            <Link to="/dashboard/add-book">
                                <div className="navbar-item-li">Додати книгу</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/search-book">
                                <div className="navbar-item-li">Пошук по книгах</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/removed-book">
                                <div className="navbar-item-li">Списані книги</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-report">
                    <div className="navbar-report-title">Звітність</div>
                    <ul>
                        <li>
                            <Link to="/dashboard/create-document">
                                <div className="navbar-item-li">Створити документ</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/all-documents">
                                <div className="navbar-item-li">Збережені документи</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-another">
                    <div className="navbar-another-title">Інше</div>
                    <ul>
                        <li>
                            <Link to="/dashboard/settings">
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
                        <li>
                            <Link to="/dashboard/documentation">
                                <div className="navbar-item-li">Довідка</div>
                                <img src={arrow} alt="Arrow" className="navbar-item-icon" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
