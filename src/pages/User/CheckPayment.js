import React, { useEffect, useState } from "react";

import Header from "../../components/Common/header/Header";

import '../../styles/CheckPayment.css';
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const CheckPaymentPage = ({ toggleNavbar, isNavbarVisible }) => {

    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");

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

        fetchUserProfile();
    }, []);


    return (
        <>
            <Header name="Підтвердження транзакції..." onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            <div className="container-for-card info-card">
                <h1>Ваш акаунт в очікуванні підтвердження платежу</h1>
                <p>Очікуйте підтвердження платіжної транзакції. Якщо операція пройшла успішно, впродовж 24 год ви отримаєте можливість користуватися онлайн-каталогом</p>
                <p>За додатковими питаннями, можете звернутися до підтримки</p>
            </div>
        </>
    );
};

export default CheckPaymentPage;