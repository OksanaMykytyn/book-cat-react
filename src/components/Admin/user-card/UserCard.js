import React from "react";
import Button from "../../Common/button/Button";
import './UserCard.css';
import defaultImage from '../../../assets/image/avatar.png';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const planMapping = {
    1: "До 10 тис книг",
    2: "До 15 тис книг",
    3: "До 30 тис книг"
};

const UserCard = ({ userImageCard, userNameCard, planId }) => {
    const planName = planMapping[planId] || "Невідомий тариф";
    const userPhoto = userImageCard ? `https://localhost:7104${userImageCard}` : defaultImage;

    return (
        <div className="container-for-card in-waitnig-card">
            <div className="user-group">
                <img src={userPhoto} alt="User Photo" />
                <p>{userNameCard} (Тарифний план: {planName})</p>
            </div>
        </div>
    );
};

export default UserCard;
