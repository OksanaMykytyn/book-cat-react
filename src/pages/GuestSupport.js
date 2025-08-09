import React from "react";
import "../styles/Payment.css";

import Header from "../components/Auth/header/Header";

const GuestSupportPage = () => {
    return (
        <>
            <Header title="Підтрика" />
            <div className="container-for-card payment-page">
                <h1>Уся комунікація із підтримкою відбувається через пошту</h1>
                <p>З будь-яких питань звертайтеся до нас на пошту bookcatalog.library@gmail.com</p>
                <p>Будемо раді відповісти на всі питання!</p>
                <p>Відповідь очікуйте впродовж 24 годин</p>
            </div>
        </>
    );
};

export default GuestSupportPage;
