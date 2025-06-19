import React from "react";
import Button from "../../Common/button/Button";
import './UserCard.css';
import defaultImage from '../../../assets/image/avatar.png';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserCard = ({ userImageCard, userNameCard, planId, plans }) => {
    const plan = plans.find(p => p.id === planId);
    const planName = plan ? `До ${plan.maxBooks} книг` : "Невідомий тариф";
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
