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
    const [errors, setErrors] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const newErrors = { email: "", password: "" };
        let valid = true;

        if (!email.trim()) {
            newErrors.email = "Введіть електронну пошту";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = "Невірний формат електронної пошти";
            valid = false;
        }

        if (!password.trim()) {
            newErrors.password = "Введіть пароль";
            valid = false;
        } else if (!/^[A-Za-z0-9]{8,20}$/.test(password.trim())) {
            newErrors.password = "Пароль: 8–20 символів, лише латиниця й цифри";
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            const response = await axiosInstance.post("/user/login", {
                userlogin: email.trim(),
                userpassword: password.trim()
            }, {
                headers: { 'X-Requested-From': 'BookCatApp' }
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

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
                        autoComplete="username"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        required
                    />
                    {errors.email && <div className="error-text">{errors.email}</div>}
                </div>

                <div className="form-group-with-input">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors((prev) => ({ ...prev, password: "" }));
                        }}
                        required
                    />
                    {errors.password && <div className="error-text">{errors.password}</div>}
                </div>


                {errorMessage && (
                    <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
                )}

                <Button color="purple-min" name="Увійти" />
                <p className="tac">Якщо у вас немає акаунту, натисніть <Link to="/register">Зареєструватися</Link></p>
            </form>
        </>
    );
};

export default LoginPage;
