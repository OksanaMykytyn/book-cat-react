import React from "react";
import '../styles/Landing.css';
import topImage from "../assets/image/top_image.jpg";
import bottomImage from "../assets/image/bottom_image.jpg";

import step1Image from "../assets/image/step_1.jpg";
import step2Image from "../assets/image/step_2.jpg";
import step3Image from "../assets/image/step_3.jpg";

import Header from "../components/Landing/header/Header";
import Button from "../components/Common/button/Button";

const LandingPage = () => {
    return (
        <div className="landing">
            <Header />
            <section className="container landing-promo">
                <img src={topImage} alt="Image" />
                <div className="landing-promo-group">
                    <h1>Створи онлайн-каталог бібліотеки</h1>
                    <p>Реєструй акаунт, додавай книги, генеруй звітнісь! Якщо виникають питання, звертайся у нашу підтримку</p>
                    <div className="landing-promo-group-buttons">
                        <Button color="purple-min" name="Зареєструватися" />
                        <Button color="white-min" name="Написати" />
                    </div>
                </div>
            </section>

            <section className="container landing-why">
                <h2>Чому варто обрати нас?</h2>
                <div className="landing-why-group">
                    <div className="landing-why-left-image">
                        <img src={step1Image} alt="Step 1" />
                        <div className="landing-why-text">Зручний інтерфейс. Необхідні поля, щоб додати книги</div>
                    </div>
                    <div className="landing-why-right-image">
                        <div className="landing-why-text">Здійснюй пошук по книгах за назвою, автором, роком видання, УДК та іншими параметрами. Списуй книги, редагуй чи видаляй в один клік</div>
                        <img src={step2Image} alt="Step 2" />
                    </div>
                    <div className="landing-why-left-image">
                        <img src={step3Image} alt="Step 3" />
                        <div className="landing-why-text">Генеруй звітність, заповнивши відповідні поля</div>
                    </div>
                </div>
            </section>
            <section className="container landing-payment">
                <h2>Обери свій тарифний план</h2>
                <div className="landing-payment-group">
                    <div className="container-for-card landing-payment-element">
                        <div className="landing-payment-element-count">До 15 тис. книг</div>
                        <div className="landing-payment-element-price">100 грн / міс.</div>
                    </div>
                    <div className="container-for-card landing-payment-element">
                        <div className="landing-payment-element-count">До 30 тис. книг</div>
                        <div className="landing-payment-element-price">200 грн / міс.</div>
                    </div>
                    <div className="container-for-card landing-payment-element">
                        <div className="landing-payment-element-count">Від 30 тис. книг</div>
                        <div className="landing-payment-element-price">360 грн / міс.</div>
                    </div>
                </div>
            </section>
            <section className="container landing-promo landing-end">
                <img src={bottomImage} alt="Image" />
                <div className="landing-promo-group">
                    <h2>Перенеси бібліотеку у свій онлайн-каталог від BookCat</h2>
                    <div className="landing-promo-group-buttons">
                        <Button color="purple-min" name="Зареєструватися" />
                    </div>
                </div>
            </section>
            <footer>
                Авторські права захищено.
            </footer>
        </div>
    );
};

export default LandingPage;