import React from "react";
import Header from "../components/Auth/header/Header";
import '../styles/Register.css';
import Button from "../components/Common/button/Button";

import { Link } from "react-router-dom";


const RegisterPage = () => {
    return (
        <>
            <Header title="Реєстрація" />
            <form action="post" className="container-for-card form-register">
                <div className="form-group-with-input">
                    <label htmlFor="">Назва школи або бібліотеки</label>
                    <input type="text" />
                </div>
                <div className="form-group-with-input">
                    <label htmlFor="">Електронна пошта</label>
                    <input type="email" />
                </div>
                <div className="form-group-with-input">
                    <label htmlFor="">Пароль</label>
                    <input type="password" />
                </div>
                <div className="form-group-with-three-card">
                    <div className="form-group-with-three-card-text">Оберіть тарифний план</div>
                    <div className="form-group-with-three-card-elements">
                        <div className="form-group-with-three-card-element">
                            <div className="form-group-with-three-card-element-count">До 15 тис. книг</div>
                            <div className="form-group-with-three-card-element-price">100 грн / міс.</div>
                        </div>
                        <div className="form-group-with-three-card-element">
                            <div className="form-group-with-three-card-element-count">До 30 тис. книг</div>
                            <div className="form-group-with-three-card-element-price">200 грн / міс.</div>
                        </div>
                        <div className="form-group-with-three-card-element">
                            <div className="form-group-with-three-card-element-count">Від 30 тис. книг</div>
                            <div className="form-group-with-three-card-element-price">360 грн / міс.</div>
                        </div>
                    </div>
                </div>
                <Button color="purple-min" name="Зареєструватися" />
                <p>Якщо у вас уже є акаунт, натисніть <Link to="/login">Увійти</Link></p>
            </form>
        </>
    );
};

export default RegisterPage;