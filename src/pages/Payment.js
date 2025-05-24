import React from "react";
import "../styles/Payment.css";

import Header from "../components/Auth/header/Header";
import Button from "../components/Common/button/Button";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate("/dashboard/check-payment");
    };

    return (
        <>
            <Header title="Оплата" />
            <div className="container-for-card payment-page">
                <h1>Ваш акаунт в очікуванні підтвердження платежу</h1>
                <p>Оплату потрібно здійснити на карту ПриватБанку: 4452 4903 9403 9403</p>
                <p>Кожного місяця цього дня необхідно оплачувати ваш тарифний план. Якщо протягом 30 днів після завершення терміну тарифу не буде оплачено, каталог бібліотеки видалиться з бази даних.</p>
                <p>Очікуйте підтвердження платіжної транзакції. Якщо операція пройшла успішно, впродовж 24 год ви отримаєте можливість користуватися онлайн-каталогом</p>
                <p>За додатковими питаннями, можете звернутися до підтримки</p>
                <Button
                    color="purple-min"
                    name="Перейти у кабінет"
                    onClick={handleGoToDashboard}
                />
            </div>
        </>
    );
};

export default PaymentPage;
