import react from "react";
import './Header.css';

import logo from "../../../assets/icon/main_logo_black.svg";
import support from "../../../assets/icon/support.svg";

const Header = ({ title }) => {
    return (
        <div className="header-auth">
            <div className="header-auth-logo">
                <img src={logo} alt="Logo" />
                <div className="header-auth-logo-text">BookCat</div>
            </div>
            <div className="header-auth-title">{title}</div>
            <div className="header-auth-support">
                <div className="header-auth-support-text">Підтримка</div>
                <img src={support} alt="Support" />
            </div>
        </div>
    );
};

export default Header;