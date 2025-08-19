import React from "react";
import Button from "../../Common/button/Button";
import './PendingUser.css';
import defaultImage from '../../../assets/image/avatar.png';
import { toast } from 'react-toastify';
import axiosInstance from "../../../axiosInstance";

const PendingUser = ({ userImageCard, userNameCard, planId, plans, loadingPlans, libraryId, onUserMovedToPending }) => {
    const plan = plans.find(p => p.id === planId);
    const planName = plan ? `До ${plan.maxBooks} книг` : "Невідомий тариф";
    const userPhoto = userImageCard ? userImageCard : defaultImage;

    const handleMarkUserPending = async () => {
        const token = localStorage.getItem("token");
        try {
            await axiosInstance.post(
                "/user/mark-user-pending",
                libraryId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp',
                        'Content-Type': 'application/json'
                    }
                }
            );
            toast.success("Користувача успішно переведено в очікування!");
            onUserMovedToPending(libraryId);
        } catch (error) {
            toast.error("Помилка при переведенні користувача в очікування.");
        }
    };

    return (
        <div className="container-for-card pending-card">
            <div className="user-group">
                <img src={userPhoto} alt="User Photo" />
                <p>{userNameCard} (Тарифний план: {loadingPlans ? "Завантаження..." : planName})</p>
            </div>
            <Button name="Перевести в очікування" color="purple-min-min" onClick={handleMarkUserPending} />
        </div>
    );
};

export default PendingUser;