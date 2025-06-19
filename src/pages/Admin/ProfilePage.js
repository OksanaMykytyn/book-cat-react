import React, { useEffect, useState } from "react";
import axios from "axios";

import HeaderAdmin from "../../components/Common/header/HeaderAdmin";
import axiosInstance from "../../axiosInstance";

const ProfileAdminPage = ({ isNavbarVisible, toggleNavbar }) => {
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
        <HeaderAdmin name="Профіль" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
    );
};

export default ProfileAdminPage;