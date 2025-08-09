import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/Common/header/HeaderAdmin";
import PendingUser from "../../components/Admin/pending-user/PendingUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";

const PendingPage = ({ isNavbarVisible, toggleNavbar }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [pendingUsers, setPendingUsers] = useState([]);
    const [plans, setPlans] = useState([]);
    const [loadingPlans, setLoadingPlans] = useState(true);

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

        const fetchPendingUsers = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/user/pending-list", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setPendingUsers(response.data);
            } catch (error) {
                console.error("Помилка при завантаженні боржників:", error);
            }
        };

        const fetchPlans = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/plan", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setPlans(response.data);
            } catch (error) {
                console.error("Помилка при завантаженні тарифних планів:", error);
            } finally {
                setLoadingPlans(false);
            }
        };

        fetchUserProfile();
        fetchPendingUsers();
        fetchPlans();
    }, []);

    const handleUserMovedToPending = (movedLibraryId) => {
        setPendingUsers(prevUsers =>
            prevUsers.filter(u =>
                !u.libraries.some(l => l.id === movedLibraryId)
            )
        );
    };

    return (
        <>
            <HeaderAdmin
                name="Боржники"
                onToggleNavbar={toggleNavbar}
                isNavbarVisible={isNavbarVisible}
                userName={userName}
                userImage={userImage}
            />

            {pendingUsers.map((user) => {
                const library = user.libraries[0];
                const planId = library?.planId;
                return (
                    <PendingUser
                        key={user.id}
                        userNameCard={user.username}
                        planId={planId}
                        userImageCard={user.userimage}
                        libraryId={library?.id}
                        plans={plans}
                        loadingPlans={loadingPlans}
                        onUserMovedToPending={handleUserMovedToPending}
                    />
                );
            })}

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default PendingPage;