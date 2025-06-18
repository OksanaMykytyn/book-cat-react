import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Header.css';

import logo from "../../../assets/icon/main_logo_black.svg";
import support from "../../../assets/icon/support.svg";

const Header = ({ title }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoClick = () => {
        navigate("/");
    };

    const handleSupportClick = () => {
        navigate("/guest-support");
    };

    const isSupportPage = location.pathname === "/guest-support";

    return (
        <div className="header-auth">
            <div className="header-auth-logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
                <img src={logo} alt="Logo" />
                <div className="header-auth-logo-text">BookCat</div>
            </div>
            <div className="header-auth-title">{title}</div>
            <div
                className="header-auth-support"
                onClick={handleSupportClick}
                style={{
                    cursor: "pointer",
                    visibility: isSupportPage ? "hidden" : "visible"
                }}
            >
                <div className="header-auth-support-text">Підтримка</div>
                <img src={support} alt="Support" />
            </div>
        </div>
    );
};

export default Header;
