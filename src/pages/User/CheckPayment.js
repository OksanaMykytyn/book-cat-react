import react from "react";

import Header from "../../components/Common/header/Header";

import '../../styles/CheckPayment.css';

const CheckPaymentPage = ({ toggleNavbar, isNavbarVisible }) => {
    return (
        <>
            <Header name="Підтвердження транзакції..." onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
            <div className="container-for-card info-card">
                <h1>Ваш акаунт в очікуванні підтвердження платежу</h1>
                <p>Очікуйте підтвердження платіжної транзакції. Якщо операція пройшла успішно, впродовж 24 год ви отримаєте можливість користуватися онлайн-каталогом</p>
                <p>За додатковими питаннями, можете звернутися до підтримки</p>
            </div>
        </>
    );
};

export default CheckPaymentPage;