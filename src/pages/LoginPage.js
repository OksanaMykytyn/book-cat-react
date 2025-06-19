import React, { useState } from "react";
import Header from "../components/Auth/header/Header";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/button/Button";
import "../styles/Login.css";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await axiosInstance.post("/user/login", {
                userlogin: email,
                userpassword: password
            }, {
                headers: { 'X-Requested-From': 'BookCatApp' }
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

            // для адміна
            if (email.trim().toLowerCase() === "admin@gmail.com") {
                navigate("/dashboard-admin");
            } else {
                navigate("/dashboard/add-book");
            }

        } catch (error) {
            const msg = error.response?.data || "Помилка входу. Спробуйте ще раз.";
            setErrorMessage(msg);
        }
    };

    return (
        <>
            <Header title="Вхід" />
            <form onSubmit={handleLogin} className="container-for-card form-login">
                <div className="form-group-with-input">
                    <label htmlFor="email">Електронна пошта</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group-with-input">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && (
                    <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
                )}

                <Button color="purple-min" name="Увійти" />
                <p>Якщо у вас немає акаунту, натисніть <Link to="/register">Зареєструватися</Link></p>
            </form>
        </>
    );
};

export default LoginPage;
