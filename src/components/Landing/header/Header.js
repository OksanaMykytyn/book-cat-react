import react from "react";
import logo from "../../../assets/icon/main_logo.svg";
import registerImage from "../../../assets/icon/register.svg";
import loginImage from "../../../assets/icon/login.svg";

import Divider from "../../Common/divider/Divider";

import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="landing-header">
            <Link to="/" className="landing-header-logo">
                <img src={logo} alt="Logo" />
                <div className="landing-header-logo-text">BookCat</div>
            </Link>
            <div className="landing-header-reg-and-log">
                <Link to="/register" className="landing-header-register">
                    <div className="landing-header-register-text">Зареєструватися</div>
                    <img src={registerImage} alt="Register" />
                </Link>
                <Divider type="second" />
                <Link to="/login" className="landing-header-login">
                    <div className="landing-header-login-text">Увійти</div>
                    <img src={loginImage} alt="Login" />
                </Link>
            </div>
        </div>
    );
};

export default Header;