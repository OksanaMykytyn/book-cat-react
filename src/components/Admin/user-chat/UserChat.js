import React from "react";
import Button from "../../Common/button/Button";
import './UserChat.css';
import defaultImage from '../../../assets/image/avatar.png';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserChat = ({ userImageCard, userNameCard, unreadCount, onClick }) => {
    const userPhoto = userImageCard ? userImageCard : defaultImage;

    return (
        <div className="container-for-card in-waitnig-card">
            <div className="user-group">
                <img src={userPhoto} alt="User Photo" />
                <p>{userNameCard} (Непрочитаних: {unreadCount})</p>
            </div>
            <Button name="Відповісти" color="purple-min-min" onClick={onClick} />
        </div>
    );
};

export default UserChat;
