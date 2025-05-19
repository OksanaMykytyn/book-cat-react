import React, { useState, useEffect } from "react";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";
import axios from "axios"; // Додано axios


const AddBookPage = ({ onAddBook, toggleNavbar, isNavbarVisible }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [copies, setCopies] = useState("");
    const [inventoryNumber, setInventoryNumber] = useState("");
    const [year, setYear] = useState("");
    const [udc, setUdc] = useState("");
    const [udcForm, setUdcForm] = useState("");
    const [price, setPrice] = useState("");
    const [accompanyingDoc, setAccompanyingDoc] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            inventoryNumber,
            name: title,
            author,
            yearPublishing: parseInt(year),
            udk: udc,
            udkFormDocument: udcForm,
            checkDocument: accompanyingDoc,
            price: parseFloat(price),
        };

        try {
            const token = localStorage.getItem("token"); // Отримання токена з локального сховища
            console.log(token)
            if (!token) {
                throw new Error("Токен не знайдено. Користувач не авторизований.");
            }
            const response = await axios.post("https://localhost:7104/api/book/create", newBook, {
                headers: {
                    Authorization: `Bearer ${token}` // Додавання токена до заголовків
                }
            });
            console.log("Книга успішно додана:", response.data);
            // Додайте логіку для обробки успішного додавання книги
        } catch (error) {
            console.error("Помилка при додаванні книги:", error.response ? error.response.data : error.message);
            // Додайте логіку для обробки помилки
        }
    };

    return (
        <>
            <Header name="Додати книгу" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
            <form onSubmit={handleSubmit} className="container-for-card add-book">
                <div className="row-in-card">
                    <label>Назва</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Введіть текст..." required />
                </div>
                <div className="row-in-card">
                    <label>Автор</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="input" placeholder="Введіть текст..." required />
                </div>
                <div className="row-in-card">
                    <label>*Кількість примірників</label>
                    <input type="number" value={copies} onChange={(e) => setCopies(e.target.value)} className="input" placeholder="Введіть кількість..." />
                    <label>*Інвентарний номер</label>
                    <input type="text" value={inventoryNumber} onChange={(e) => setInventoryNumber(e.target.value)} className="input" placeholder="Введіть інвентарний номер..." required />
                </div>
                <div className="row-in-card">
                    <label>Рік видання</label>
                    <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="input" placeholder="Введіть рік..." required />
                    <label>УДК</label>
                    <input type="text" value={udc} onChange={(e) => setUdc(e.target.value)} className="input" placeholder="Введіть УДК..." />
                </div>
                <div className="row-in-card">
                    <label>УДК за формою документу</label>
                    <input type="text" value={udcForm} onChange={(e) => setUdcForm(e.target.value)} className="input" placeholder="Введіть УДК за формою..." />
                    <label>Ціна примірника</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input" placeholder="Введіть ціну..." required />
                </div>
                <div className="row-in-card">
                    <label>Дата і номер супровідного документу</label>
                    <input type="text" value={accompanyingDoc} onChange={(e) => setAccompanyingDoc(e.target.value)} className="input" placeholder="Введіть дані..." />
                </div>

                <Button name="Зберегти" color="purple-min" />
            </form>
        </>
    );
};

export default AddBookPage;