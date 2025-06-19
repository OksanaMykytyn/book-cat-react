import React, { useState, useEffect } from "react";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";

const SettingsPage = ({ toggleNavbar, isNavbarVisible }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");

    const [inventoryNumber, setInventoryNumber] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setUserName(response.data.username);
                setUserImage(response.data.image);
            } catch (error) {
                console.error("Помилка при отриманні профілю користувача:", error);
            }
        };

        const fetchInventory = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/library/inventory", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setInventoryNumber(response.data.inventory);
            } catch (error) {
                console.error("Помилка при отриманні інвентарного номера:", error);
            }
        };

        fetchUserProfile();
        fetchInventory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const num = parseInt(inventoryNumber, 10);

        if (isNaN(num) || num < 0) {
            setError("Введіть коректне додатне число.");
            return;
        }

        if (inventoryNumber.toString().length > 50) {
            setError("Інвентарний номер не може бути довшим за 50 символів.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axiosInstance.put("/library/inventory", {
                inventory: num
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-Requested-From': 'BookCatApp'
                }
            });

            toast.success("Інвентарний номер успішно оновлено!");
        } catch (error) {
            console.error("Помилка при оновленні інвентарного номера:", error);
            toast.error("Не вдалося оновити інвентарний номер.");
        }
    };

    return (
        <>
            <Header name="Налаштування" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            <form className="container-for-card settings" onSubmit={handleSubmit}>
                <div className="row-in-card">
                    <label htmlFor="inventoryInput">Введіть інвентарний номер, з якого почнеться відлік</label>
                    <input
                        className="input"
                        type="number"
                        id="inventoryInput"
                        value={inventoryNumber}
                        onChange={(e) => setInventoryNumber(e.target.value)}
                    />
                    {error && <div className="error-text">{error}</div>}
                </div>
                <Button color="purple-min" name={"Зберегти"} />
            </form>
            <ToastContainer />
        </>
    );
};

export default SettingsPage;
