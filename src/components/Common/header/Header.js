import react from "react";
import './Header.css';
import Divider from "../divider/Divider";

import profileImage from '../../../assets/image/image_profile.png';
import support from '../../../assets/icon/support.svg';
import menu from '../../../assets/icon/for_menu.svg';

import { Link } from "react-router-dom";

const Header = ({ name, isNavbarVisible, onToggleNavbar, userName }) => {
    return (
        <div className="header">
            <div className="header-logo-and-menu">
                {!isNavbarVisible && (
                    <img src={menu} alt="Menu" onClick={onToggleNavbar} />
                )}
                <div className="name-page-on-header">{name}</div>
            </div>
            <div className="header-nav">
                <Link to="/dashboard/support" className="header-nav-support">
                    <div className="header-nav-support-text">Підтримка</div>
                    <img alt="icon-support" src={support} />
                </Link>
                <Divider type="first" />
                <Link to="/dashboard/profile" className="header-nav-account">
                    <div className="header-nav-account-text">{userName}</div>
                    <img src={profileImage} alt="Profile" />
                </Link>
            </div>
        </div>
    );
};

export default Header;
