import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderAdmin from "../../components/Common/header/HeaderAdmin";
import Button from "../../components/Common/button/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";


const SettingsAdminPage = ({ isNavbarVisible, toggleNavbar }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [plans, setPlans] = useState([]);
    const [emailForPassword, setEmailForPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const userResponse = await axiosInstance.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setUserName(userResponse.data.username);
                setUserImage(userResponse.data.image);

                const plansResponse = await axiosInstance.get("/plan", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setPlans(plansResponse.data);
            } catch (error) {
                console.error("Помилка при завантаженні даних:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (index, field, value) => {
        const updated = [...plans];
        updated[index][field] = value;
        setPlans(updated);
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            for (const plan of plans) {
                await axiosInstance.put(`/plan/${plan.id}`, {
                    maxBooks: parseInt(plan.maxBooks, 10),
                    price: parseFloat(plan.price)
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
            }
            toast.success("Тарифи успішно збережено!");
        } catch (error) {
            console.error("Помилка при збереженні тарифів:", error);
            toast.error("Не вдалося зберегти тарифи.");
        }
    };

    const handlePasswordChange = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axiosInstance.post("/user/change-password", {
                email: emailForPassword,
                newPassword: newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-Requested-From': 'BookCatApp'
                }
            });

            toast.success("Пароль успішно змінено.");
            setEmailForPassword("");
            setNewPassword("");
        } catch (error) {
            console.error("Помилка при зміні пароля:", error);
            const msg = error.response?.data || "Не вдалося змінити пароль.";
            toast.error(typeof msg === "string" ? msg : msg.message || "Помилка.");
        }
    };


    return (
        <>
            <HeaderAdmin
                name="Налаштування тарифів"
                onToggleNavbar={toggleNavbar}
                isNavbarVisible={isNavbarVisible}
                userName={userName}
                userImage={userImage}
            />
            <div className="container-for-card setting-admin">
                <div className="row-in-card">
                    <p className="tac text mb-20" >Налаштування тарифів</p>
                </div>

                {plans.map((plan, index) => (
                    <div className="row-in-card" key={plan.id}>
                        <label htmlFor={`maxBooks-${index}`}>Кількість книг</label>
                        <input
                            className="input"
                            type="number"
                            id={`maxBooks-${index}`}
                            value={plan.maxBooks}
                            onChange={(e) => handleChange(index, "maxBooks", e.target.value)}
                        />

                        <label htmlFor={`price-${index}`}>Ціна тарифу</label>
                        <input
                            className="input"
                            type="number"
                            step="0.01"
                            id={`price-${index}`}
                            value={plan.price}
                            onChange={(e) => handleChange(index, "price", e.target.value)}
                        />
                    </div>
                ))}

                <Button color="purple-min" name="Зберегти" onClick={handleSave} />
                <div className="row-in-card mt-40">
                    <p className="tac text mb-20">Зміна пароля користувача</p>
                </div>

                <div className="row-in-card">
                    <label htmlFor="emailForPassword">Електронна пошта</label>
                    <input
                        className="input"
                        type="email"
                        id="emailForPassword"
                        value={emailForPassword}
                        onChange={(e) => setEmailForPassword(e.target.value)}
                    />
                </div>

                <div className="row-in-card">
                    <label htmlFor="newPassword">Новий пароль</label>
                    <input
                        className="input"
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <Button color="white-min-for-profile" name="Змінити пароль" onClick={handlePasswordChange} />
            </div>
            <ToastContainer />
        </>
    );
};

export default SettingsAdminPage;
