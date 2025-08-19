import react from "react";
import './Header.css';
import Divider from "../divider/Divider";

import profileImage from '../../../assets/image/avatar.png';
import support from '../../../assets/icon/support.svg';
import menu from '../../../assets/icon/for_menu.svg';

import { Link } from "react-router-dom";

const HeaderAdmin = ({ name, isNavbarVisible, onToggleNavbar, userName, userImage }) => {
    return (
        <div className="header">
            <div className="header-logo-and-menu">
                {!isNavbarVisible && (
                    <img src={menu} alt="Menu" onClick={onToggleNavbar} />
                )}
                <div className="name-page-on-header">{name}</div>
            </div>
            <div className="header-nav">
                <Link to="/dashboard-admin/profile" className="header-nav-account">
                    <div className="header-nav-account-text">{userName}</div>
                    <img src={userImage ? userImage : profileImage} alt="Profile" />
                </Link>
            </div>
        </div>
    );
};

export default HeaderAdmin;
