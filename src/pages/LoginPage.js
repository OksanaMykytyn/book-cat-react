import React, { useState } from "react"; // Додано useState
import Header from "../components/Auth/header/Header";
import { Link, useNavigate } from "react-router-dom"; // Додано useNavigate
import Button from "../components/Common/button/Button";
import "../styles/Login.css";
import axios from "axios"; // Додано axios

const LoginPage = () => {
    const [email, setEmail] = useState(""); // Стан для електронної пошти
    const [password, setPassword] = useState(""); // Стан для пароля
    const navigate = useNavigate(); // Для перенаправлення після входу

    const handleLogin = async (e) => {
        e.preventDefault(); // Запобігаємо перезавантаженню сторінки

        try {
            const response = await axios.post('https://localhost:7104/api/user/login', {
                userlogin: email, // Змінити на ваше поле логіна
                userpassword: password // Змінити на ваше поле пароля
            });

            const token = response.data.token; // Отримуємо токен з відповіді
            localStorage.setItem('token', token); // Зберігаємо токен у localStorage

            // Перенаправлення на іншу сторінку після успішного входу
            navigate("/dashboard"); // Змінити на вашу домашню сторінку або іншу
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            // Тут можна додати обробку помилок, наприклад, показати повідомлення про помилку
        }
    };

    return (
        <>
            <Header title="Вхід" />
            <form onSubmit={handleLogin} className="container-for-card form-login"> {/* Додано onSubmit */}
                <div className="form-group-with-input">
                    <label htmlFor="">Електронна пошта</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Зберігаємо значення електронної пошти
                        required // Додаємо валідацію
                    />
                </div>
                <div className="form-group-with-input">
                    <label htmlFor="">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Зберігаємо значення пароля
                        required // Додаємо валідацію
                    />
                </div>
                <Button color="purple-min" name="Увійти" />
                <p>Якщо у вас немає акаунту, натисніть <Link to="/register">Зареєструватися</Link></p>
            </form>
        </>
    );
};

export default LoginPage;
