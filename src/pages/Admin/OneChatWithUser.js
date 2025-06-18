import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../../components/Common/header/Header";
import MessageItem from "../../components/Common/message-item/MessageItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import connection from "../../signalr";
import { useParams } from "react-router-dom";

import Button from "../../components/Common/button/Button";

const OneChatWithUser = ({ toggleNavbar, isNavbarVisible }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [chatId, setChatId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lastReceivedMessage, setLastReceivedMessage] = useState(null);

    const { id } = useParams();

    const token = localStorage.getItem("token");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (lastReceivedMessage) {
            const timeout = setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
                setLastReceivedMessage(null);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [lastReceivedMessage]);

    const fetchMessages = async (chatId) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`https://localhost:7104/api/support/chat/${chatId}/messages`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages(res.data);
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
            }, 100);
        } catch (err) {
            console.error("Помилка при завантаженні повідомлень:", err);
            toast.error("Не вдалося завантажити повідомлення.");
        } finally {
            setIsLoading(false);
        }
    };

    const connectToSignalR = async (chatId) => {
        try {
            if (connection.state !== "Connected") {
                await connection.start();
                console.log("SignalR Connected");
            }

            await connection.invoke("JoinChat", chatId);
            console.log(`Joined chat group: chat-${chatId}`);

            connection.on("ReceiveMessage", (message) => {
                setMessages(prevMessages => [...prevMessages, message]);
                setLastReceivedMessage(message);
            });

            connection.on("MessagesMarkedAsRead", (chatId, readerType) => {
                console.log(`Messages in chat ${chatId} marked as read by ${readerType}`);
                if (readerType !== "admin") {
                    setMessages(prevMessages =>
                        prevMessages.map(msg =>
                            msg.senderType === "admin" ? { ...msg, isRead: true } : msg
                        )
                    );
                }
            });


        } catch (error) {
            console.error("Помилка SignalR:", error);
            toast.error("Не вдалося підключитися до чату в реальному часі.");
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
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

        const initChat = async () => {
            if (!id) return;

            setChatId(parseInt(id));

            await fetchMessages(parseInt(id));

            await connectToSignalR(parseInt(id));
        };

        fetchUserProfile();
        initChat();

        return () => {
            if (connection.state === "Connected") {
                connection.off("ReceiveMessage");
                connection.off("MessagesMarkedAsRead");
                connection.invoke("LeaveChat", parseInt(id))
                    .then(() => console.log(`Left chat group: chat-${id}`))
                    .catch(e => console.error("Error leaving chat group:", e));
            }
        };
    }, [id, token]);

    const handleSendMessage = async () => {
        if (!messageText.trim() || !chatId) return;

        try {
            await connection.invoke("SendMessage", chatId, messageText);

            setMessageText("");
        } catch (err) {
            console.error("Помилка при надсиланні повідомлення через SignalR:", err);
            toast.error("Помилка при надсиланні повідомлення.");
        }
    };

    return (
        <>
            <Header name="Підтримка" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />

            <div className="all-message">
                {isLoading ? (
                    <p>Завантаження повідомлень...</p>
                ) : (
                    messages.map(msg => (
                        <MessageItem
                            key={msg.id}
                            avatar={msg.avatar}
                            text={msg.message}
                            senderType={msg.senderType}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="container-for-card send-message">
                <div className="row-in-card">
                    <label htmlFor="message">Введіть ваше повідомлення</label> {/* Змінив текст лейблу */}
                    <input
                        id="message"
                        type="text"
                        placeholder="Напишіть повідомлення..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                        className="input"
                        disabled={isLoading}
                    />
                </div>
                <Button color="purple-min" name="Надіслати" onClick={handleSendMessage} disabled={isLoading || !messageText.trim()} />
            </div>

            <ToastContainer />
        </>
    );
};

export default OneChatWithUser;