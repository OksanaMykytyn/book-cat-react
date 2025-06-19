import React, { useEffect, useState } from "react";
import Header from "../../components/Common/header/Header";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";

const SupportPage = ({ toggleNavbar, isNavbarVisible }) => {
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
            <Header name="Підтримка" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            <div className="container-for-card info-card">
                <h1>Уся комунікація із підтримкою відбувається через пошту</h1>
                <p>З будь-яких питань звертайтеся до нас на пошту admin@gmail.com</p>
                <p>Будемо раді відповісти на всі питання!</p>
                <p>Відповідь очікуйте впродовж 24 годин</p>
            </div>
        </>
    );
};

export default SupportPage;