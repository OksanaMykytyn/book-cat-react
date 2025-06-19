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
                        Authorization: `Bearer ${token}`
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
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            toast.success("Тарифи успішно збережено!");
        } catch (error) {
            console.error("Помилка при збереженні тарифів:", error);
            toast.error("Не вдалося зберегти тарифи.");
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
            </div>
            <ToastContainer />
        </>
    );
};

export default SettingsAdminPage;
