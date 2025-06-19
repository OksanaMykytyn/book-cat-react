import React, { useEffect, useState } from "react";
import axios from "axios";

import HeaderAdmin from "../../components/Common/header/HeaderAdmin";
import InWaitingUser from "../../components/Admin/in-waiting-user/InWaitingUser";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";

const InWaitingPage = ({ isNavbarVisible, toggleNavbar }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [waitingUsers, setWaitingUsers] = useState([]);

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

        const fetchInWaitingUsers = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/user/in-waiting", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setWaitingUsers(response.data);
            } catch (error) {
                console.error("Помилка при завантаженні користувачів в очікуванні:", error);
            }
        };

        fetchUserProfile();
        fetchInWaitingUsers();
    }, []);

    return (
        <>
            <HeaderAdmin
                name="В очікуванні"
                onToggleNavbar={toggleNavbar}
                isNavbarVisible={isNavbarVisible}
                userName={userName}
                userImage={userImage}
            />

            {waitingUsers.map((user) => {
                const planId = user.libraries[0]?.planId;
                return (
                    <InWaitingUser
                        key={user.id}
                        userNameCard={user.username}
                        planId={planId}
                        userImageCard={user.userimage}
                        libraryId={user.libraries[0]?.id}
                        onPaymentConfirmed={(confirmedLibraryId) => {
                            setWaitingUsers(prevUsers =>
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

export default InWaitingPage;
