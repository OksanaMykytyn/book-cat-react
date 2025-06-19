import React from "react";
import Button from "../../Common/button/Button";
import './BannedUser.css';
import defaultImage from '../../../assets/image/avatar.png';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../../axiosInstance";

const planMapping = {
    1: "До 10 тис книг",
    2: "До 15 тис книг",
    3: "До 30 тис книг"
};

const BannedUser = ({ userImageCard, userNameCard, planId, libraryId, onPaymentConfirmed }) => {
    const planName = planMapping[planId] || "Невідомий тариф";
    const userPhoto = userImageCard ? userImageCard : defaultImage;

    const handleCheckPayment = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axiosInstance.post(
                "/user/ban-user",
                libraryId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp',
                        'Content-Type': 'application/json'
                    }
                }
            );
            toast.success("Акаунт заблоковано успішно!");
            onPaymentConfirmed(libraryId);
        } catch (error) {
            toast.error("Помилка при блокуванні акаунту.");
        }
    };

    return (
        <div className="container-for-card in-waitnig-card">
            <div className="user-group">
                <img src={userPhoto} alt="User Photo" />
                <p>{userNameCard} (Тарифний план: {planName})</p>
            </div>
            <Button name="Заблокувати акаунт" color="purple-min-min" onClick={handleCheckPayment} />
        </div>
    );
};

export default BannedUser;
