import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";

const EditBookPage = ({ toggleNavbar, isNavbarVisible }) => {
    const { inventoryNumber } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [udc, setUdc] = useState("");
    const [udcForm, setUdcForm] = useState("");
    const [price, setPrice] = useState("");
    const [accompanyingDoc, setAccompanyingDoc] = useState("");
    const [writeOffDate, setWriteOffDate] = useState("");


    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setUserName(response.data.username);
                setUserImage(response.data.image);
            } catch (error) {
                console.error("Помилка при отриманні профілю користувача:", error);
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axiosInstance.get(`/book/get/${inventoryNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                const book = response.data;


                setTitle(book.name || "");
                setAuthor(book.author || "");
                setYear(book.yearPublishing || "");
                setUdc(book.udk || "");
                setUdcForm(book.udkFormDocument || "");
                setPrice(book.price || "");
                setAccompanyingDoc(book.checkDocument || "");
                setWriteOffDate(book.removed ? book.removed.substring(0, 10) : "");


            } catch (error) {
                console.error("Не вдалося завантажити дані книги:", error);
                toast.error("Книгу не знайдено");
            }
        };

        if (inventoryNumber) {
            fetchBook();
        }
    }, [inventoryNumber]);

    const validateFields = () => {
        const newErrors = {};
        if (!title || title.length > 255) newErrors.title = "Назва обов’язкова і не повинна перевищувати 255 символів.";
        if (author && author.length > 255) newErrors.author = "Автор не повинен перевищувати 255 символів.";
        if (udc && udc.length > 100) newErrors.udc = "УДК не повинен перевищувати 100 символів.";
        if (udcForm && udcForm.length > 100) newErrors.udcForm = "УДК за формою не повинен перевищувати 100 символів.";
        if (price && !/^\d+(\.\d{1,2})?$/.test(price)) newErrors.price = "Ціна повинна бути у форматі 0.00.";
        if (accompanyingDoc && accompanyingDoc.length > 255) newErrors.accompanyingDoc = "Супровідний документ до 255 символів.";
        if (year && (!/^\d{4}$/.test(year) || year < 1800 || year > 2100)) newErrors.year = "Рік повинен бути між 1800 і 2100.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Не авторизовано");
            return;
        }

        const updatedBook = {
            inventoryNumber,
            name: title,
            author,
            yearPublishing: year ? parseInt(year) : null,
            udk: udc,
            udkFormDocument: udcForm,
            checkDocument: accompanyingDoc,
            price: price ? parseFloat(price) : null,
            removed: writeOffDate ? writeOffDate : null
        };


        try {
            const response = await axiosInstance.put(`/book/update/${inventoryNumber}`, updatedBook, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-Requested-From": "BookCatApp"
                }
            });

            toast.success("Книгу оновлено!");
            navigate(-1);
        } catch (error) {
            console.error("Помилка при оновленні книги:", error);
            toast.error("Помилка при оновленні книги");
        }
    };

    return (
        <>
            <Header name="Редагувати книгу" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            <form onSubmit={handleSubmit} className="container-for-card add-book">
                <div className="row-in-card">
                    <label>Назва</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Введіть текст..." required />
                </div>
                <div className="row-in-card">
                    <label>Автор</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="input" placeholder="Введіть текст..." />
                </div>
                <div className="row-in-card">
                    <label>Інвентарний номер</label>
                    <input type="text" value={inventoryNumber} readOnly className="input" />
                    <label>Дата списання</label>
                    <input
                        type="date"
                        value={writeOffDate}
                        onChange={(e) => setWriteOffDate(e.target.value)}
                        className="input"
                    />

                </div>
                <div className="row-in-card">
                    <label>Рік видання</label>
                    <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="input" />
                    <label>УДК</label>
                    <input type="text" value={udc} onChange={(e) => setUdc(e.target.value)} className="input" />
                </div>
                <div className="row-in-card">
                    <label>УДК за формою документу</label>
                    <input type="text" value={udcForm} onChange={(e) => setUdcForm(e.target.value)} className="input" />
                    <label>Ціна примірника</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input" />
                </div>
                <div className="row-in-card">
                    <label>Супровідний документ</label>
                    <input type="text" value={accompanyingDoc} onChange={(e) => setAccompanyingDoc(e.target.value)} className="input" />
                </div>

                <Button name="Зберегти" color="purple-min" />
                <ToastContainer />
            </form>
        </>
    );
};

export default EditBookPage;
