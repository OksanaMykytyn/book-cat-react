import React, { useState } from "react";
import Header from "../components/Auth/header/Header";
import '../styles/Register.css';
import Button from "../components/Common/button/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const plans = [
    { id: 1, title: "До 15 тис. книг", price: "100 грн / міс." },
    { id: 2, title: "До 30 тис. книг", price: "200 грн / міс." },
    { id: 3, title: "Від 30 тис. книг", price: "360 грн / міс." }
];

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [userlogin, setUserlogin] = useState("");
    const [userpassword, setUserpassword] = useState("");
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        username: "",
        userlogin: "",
        userpassword: "",
        plan: "",
        general: ""
    });

    const handlePlanSelect = (id) => {
        setSelectedPlanId(id);
        setErrors((prev) => ({ ...prev, plan: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;
        const newErrors = {
            username: "",
            userlogin: "",
            userpassword: "",
            plan: "",
            general: ""
        };

        if (!username.trim()) {
            newErrors.username = "Назва обов’язкова";
            valid = false;
        } else if (!/^[А-Яа-яІіЇїЄєA-Za-z0-9\s]{1,100}$/u.test(username.trim())) {
            newErrors.username = "Тільки літери та цифри (до 100 символів)";
            valid = false;
        }

        if (!userlogin.trim()) {
            newErrors.userlogin = "Електронна пошта обов’язкова";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userlogin.trim())) {
            newErrors.userlogin = "Невірний формат пошти";
            valid = false;
        }

        if (!userpassword.trim()) {
            newErrors.userpassword = "Пароль обов’язковий";
            valid = false;
        } else if (!/^[A-Za-z0-9]{8,20}$/.test(userpassword.trim())) {
            newErrors.userpassword = "Пароль: 8–20 символів, лише латиниця й цифри";
            valid = false;
        }

        if (!selectedPlanId) {
            newErrors.plan = "Оберіть тарифний план";
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            await axios.post("https://localhost:7104/api/user/register", {
                Username: username.trim(),
                Userlogin: userlogin.trim(),
                Userpassword: userpassword.trim(),
                PlanId: selectedPlanId,
            }, {
                headers: { 'X-Requested-From': 'BookCatApp' }
            });

            const loginResponse = await axios.post("https://localhost:7104/api/user/login", {
                Userlogin: userlogin.trim(),
                Userpassword: userpassword.trim()
            });

            const token = loginResponse.data.token;
            localStorage.setItem("token", token);

            window.location.href = "/payment";

        } catch (error) {
            if (error.response) {
                setErrors((prev) => ({ ...prev, general: `Помилка: ${error.response.data}` }));
            } else {
                setErrors((prev) => ({ ...prev, general: "Сталася помилка при реєстрації" }));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title="Реєстрація" />
            <form className="container-for-card form-register" onSubmit={handleSubmit}>
                <div className="form-group-with-input">
                    <label>Назва школи або бібліотеки</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors((prev) => ({ ...prev, username: "" }));
                        }}
                    />
                    {errors.username && <div className="error-text">{errors.username}</div>}
                </div>

                <div className="form-group-with-input">
                    <label>Електронна пошта</label>
                    <input
                        type="email"
                        value={userlogin}
                        onChange={(e) => {
                            setUserlogin(e.target.value);
                            setErrors((prev) => ({ ...prev, userlogin: "" }));
                        }}
                    />
                    {errors.userlogin && <div className="error-text">{errors.userlogin}</div>}
                </div>

                <div className="form-group-with-input">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={userpassword}
                        onChange={(e) => {
                            setUserpassword(e.target.value);
                            setErrors((prev) => ({ ...prev, userpassword: "" }));
                        }}
                    />
                    {errors.userpassword && <div className="error-text">{errors.userpassword}</div>}
                </div>

                <div className="form-group-with-three-card">
                    <div className="form-group-with-three-card-text">Оберіть тарифний план</div>
                    <div className="form-group-with-three-card-elements">
                        {plans.map(plan => (
                            <div
                                key={plan.id}
                                className={`form-group-with-three-card-element ${selectedPlanId === plan.id ? 'selected' : ''}`}
                                onClick={() => handlePlanSelect(plan.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="form-group-with-three-card-element-count">{plan.title}</div>
                                <div className="form-group-with-three-card-element-price">{plan.price}</div>
                            </div>
                        ))}
                    </div>
                    {errors.plan && <div className="error-text">{errors.plan}</div>}
                </div>

                {errors.general && <div className="error-text">{errors.general}</div>}

                <Button color="purple-min" name={loading ? "Зачекайте..." : "Зареєструватися"} disabled={loading} />
                <p>Якщо у вас уже є акаунт, натисніть <Link to="/login">Увійти</Link></p>
            </form>
        </>
    );
};

export default RegisterPage;