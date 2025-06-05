import React, { useEffect, useState } from "react";
import axios from "axios";

import HeaderAdmin from "../../components/Common/header/HeaderAdmin";

const SettingsAdminPage = ({ isNavbarVisible, toggleNavbar }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");


    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axios.get("https://localhost:7104/api/user/profile", {
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
        <HeaderAdmin name="Налаштування" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
    );
};

export default SettingsAdminPage;