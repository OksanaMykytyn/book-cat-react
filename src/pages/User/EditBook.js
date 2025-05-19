import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";

const EditBookPage = ({ books, removedBooks, onUpdateBook, toggleNavbar, isNavbarVisible }) => {
    const { inventoryNumber } = useParams();
    const navigate = useNavigate();

    const bookToEdit = books.find(book => book.inventoryNumber === inventoryNumber) ||
        removedBooks.find(book => book.inventoryNumber === inventoryNumber);


    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [copies, setCopies] = useState("");
    const [year, setYear] = useState("");
    const [udc, setUdc] = useState("");
    const [udcForm, setUdcForm] = useState("");
    const [price, setPrice] = useState("");
    const [accompanyingDoc, setAccompanyingDoc] = useState("");

    useEffect(() => {
        if (bookToEdit) {
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
            setCopies(bookToEdit.copies);
            setYear(bookToEdit.year);
            setUdc(bookToEdit.udc);
            setUdcForm(bookToEdit.udcForm);
            setPrice(bookToEdit.price);
            setAccompanyingDoc(bookToEdit.accompanyingDoc);
        }
    }, [bookToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBook = {
            inventoryNumber,
            title,
            author,
            year: parseInt(year),
            udc,
            udcForm,
            accompanyingDoc,
            price: parseFloat(price),
        };
        onUpdateBook(updatedBook);
        navigate(-1);
    }; return (
        <>
            <Header name="Редагувати книгу" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
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
                    <input type="text" value={inventoryNumber} readOnly className="input" placeholder="Введіть інвентарний номер..." required />
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

export default EditBookPage;