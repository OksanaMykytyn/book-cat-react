import React from "react";
import Button from "../../Common/button/Button";
import './InWaitingUser.css';
import defaultImage from '../../../assets/image/avatar.png';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const planMapping = {
    1: "До 10 тис книг",
    2: "До 15 тис книг",
    3: "До 30 тис книг"
};

const InWaitingUser = ({ userImageCard, userNameCard, planId, libraryId, onPaymentConfirmed }) => {
    const planName = planMapping[planId] || "Невідомий тариф";
    const userPhoto = userImageCard ? userImageCard : defaultImage;

    const handleCheckPayment = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "https://localhost:7104/api/user/check-payment",
                libraryId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp',
                        'Content-Type': 'application/json'
                    }
                }
            );
            toast.success("Оплату підтверджено успішно!");
            onPaymentConfirmed(libraryId);
        } catch (error) {
            toast.error("Помилка при підтвердженні оплати.");
        }
    };

    return (
        <div className="container-for-card in-waitnig-card">
            <div className="user-group">
                <img src={userPhoto} alt="User Photo" />
                <p>{userNameCard} (Тарифний план: {planName})</p>
            </div>
            <Button name="Підтвердити оплату" color="purple-min-min" onClick={handleCheckPayment} />
        </div>
    );
};

export default InWaitingUser;
