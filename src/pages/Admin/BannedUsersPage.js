import React, { useEffect, useState } from "react";
import axios from "axios";

import HeaderAdmin from "../../components/Common/header/HeaderAdmin";
import BannedUser from "../../components/Admin/banned-user/BannedUser";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";


const BannedUsersPage = ({ isNavbarVisible, toggleNavbar }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [bannedUsers, setBannedUsers] = useState([]);


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


        const fetchBannedUsers = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/user/banned-list", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setBannedUsers(response.data);
            } catch (error) {
                console.error("Помилка при завантаженні користувачів в очікуванні:", error);
            }
        };

        fetchUserProfile();
        fetchBannedUsers();
    }, []);

    return (
        <>
            <HeaderAdmin name="Заборгованості" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />

            {bannedUsers.map((user) => {
                const planId = user.libraries[0]?.planId;
                return (
                    <BannedUser
                        key={user.id}
                        userNameCard={user.username}
                        planId={planId}
                        userImageCard={user.userimage}
                        libraryId={user.libraries[0]?.id}
                        onPaymentConfirmed={(confirmedLibraryId) => {
                            setBannedUsers(prevUsers =>
                                prevUsers.filter(u =>
                                    !u.libraries.some(l => l.id === confirmedLibraryId)
                                )
                            );
                        }}
                    />
                );
            })}

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default BannedUsersPage;