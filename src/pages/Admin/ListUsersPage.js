import React, { useEffect, useState } from "react";
import axios from "axios";

import HeaderAdmin from "../../components/Common/header/HeaderAdmin";
import UserCard from "../../components/Admin/user-card/UserCard";

const ListUsersPage = ({ isNavbarVisible, toggleNavbar }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [users, setUsers] = useState([]);



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

    useEffect(() => {
        const fetchUserList = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axios.get("https://localhost:7104/api/user/user-list", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Помилка при завантаженні списку користувачів:", error);
            }
        };

        fetchUserList();
    }, []);

    return (
        <>
            <HeaderAdmin name="Список користувачів" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            {users.map((user) => {
                const planId = user.libraries[0]?.planId;
                return (
                    <UserCard
                        key={user.id}
                        userNameCard={user.username}
                        userImageCard={user.userimage}
                        planId={planId}
                    />
                );
            })}
        </>
    );
};

export default ListUsersPage;