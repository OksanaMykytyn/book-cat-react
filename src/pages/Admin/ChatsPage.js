import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderAdmin from "../../components/Common/header/HeaderAdmin";
import { useNavigate } from "react-router-dom";

import UserChat from "../../components/Admin/user-chat/UserChat";

const ChatsPage = ({ isNavbarVisible, toggleNavbar }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [chats, setChats] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const profileRes = await axios.get("https://localhost:7104/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-Requested-From": "BookCatApp"
                    }
                });
                setUserName(profileRes.data.username);
                setUserImage(profileRes.data.image);

                const chatsRes = await axios.get("https://localhost:7104/api/support/admin/chats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-Requested-From": "BookCatApp"
                    }
                });

                setChats(chatsRes.data);
            } catch (err) {
                console.error("Помилка при отриманні даних:", err);
            }
        };

        fetchData();
    }, []);

    const handleOpenChat = (chatId) => {
        navigate(`/dashboard-admin/chat/${chatId}`);
    };

    return (
        <div>
            <HeaderAdmin
                name="Чати"
                onToggleNavbar={toggleNavbar}
                isNavbarVisible={isNavbarVisible}
                userName={userName}
                userImage={userImage}
            />
            <div className="chat-list">
                {chats.map((chat) => (
                    <UserChat
                        key={chat.chatId}
                        unreadCount={chat.unreadCount}
                        userImageCard={chat.userImage}
                        userNameCard={chat.userName}
                        onClick={() => handleOpenChat(chat.chatId)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatsPage;
