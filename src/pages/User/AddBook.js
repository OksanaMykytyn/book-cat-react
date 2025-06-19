import React, { useState, useEffect } from "react";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";

const AddBookPage = ({ toggleNavbar, isNavbarVisible }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [copies, setCopies] = useState("");
    const [inventoryNumber, setInventoryNumber] = useState("");
    const [year, setYear] = useState("");
    const [udc, setUdc] = useState("");
    const [udcForm, setUdcForm] = useState("");
    const [price, setPrice] = useState("");
    const [accompanyingDoc, setAccompanyingDoc] = useState("");

    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");


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

    const handleCopiesChange = (e) => {
        setCopies(e.target.value);
        if (e.target.value !== "") {
            setInventoryNumber("");
        }
    };

    const handleInventoryNumberChange = (e) => {
        setInventoryNumber(e.target.value);
        if (e.target.value !== "") {
            setCopies("");
        }
    };

    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};

        if (!title || title.length > 255) {
            newErrors.title = "Назва обов’язкова і не повинна перевищувати 255 символів.";
        }

        if (author && author.length > 255) {
            newErrors.author = "Ім’я автора не повинно перевищувати 255 символів.";
        }

        if (inventoryNumber && (!/^\d+$/.test(inventoryNumber) || inventoryNumber.length > 50)) {
            newErrors.inventoryNumber = "Інвентарний номер повинен містити тільки цифри та бути до 50 символів.";
        }

        if (udc && udc.length > 100) {
            newErrors.udc = "УДК не повинен перевищувати 100 символів.";
        }

        if (udcForm && udcForm.length > 100) {
            newErrors.udcForm = "УДК за формою не повинен перевищувати 100 символів.";
        }

        if (price && !/^\d+(\.\d{1,2})?$/.test(price)) {
            newErrors.price = "Ціна повинна бути у форматі 0.00 (до 2 знаків після коми).";
        }

        if (accompanyingDoc && accompanyingDoc.length > 255) {
            newErrors.accompanyingDoc = "Супровідний документ повинен бути до 255 символів.";
        }

        if (year && (!/^\d{4}$/.test(year) || year < 1800 || year > 2100)) {
            newErrors.year = "Рік повинен бути 4-значним числом між 1800 і 2100.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearForm = () => {
        setTitle("");
        setAuthor("");
        setCopies("");
        setInventoryNumber("");
        setYear("");
        setUdc("");
        setUdcForm("");
        setPrice("");
        setAccompanyingDoc("");
        setErrors({});
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setErrors({ global: "Користувач не авторизований. Токен відсутній." });
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            "X-Requested-From": "BookCatApp",
        };

        const baseBook = {
            name: title,
            author,
            yearPublishing: year ? parseInt(year) : null,
            udk: udc,
            udkFormDocument: udcForm,
            checkDocument: accompanyingDoc,
            price: price ? parseFloat(price) : null,
            removed: null
        };

        try {
            if (inventoryNumber) {
                const singleBook = { ...baseBook, inventoryNumber };
                const response = await axiosInstance.post("/book/create", singleBook, { headers });
                toast.success("Книгу успішно додано!");
            } else {
                const numCopies = copies ? parseInt(copies) : 1;
                if (numCopies > 1) {
                    toast.info("Книги надсилаються. Зачекайте завершення процесу...");
                }
                for (let i = 0; i < numCopies; i++) {
                    const response = await axiosInstance.post("/book/create", baseBook, { headers });
                }

                toast.success("Книги успішно додані!");
            }

            clearForm();

        } catch (error) {
            const backendMessage =
                typeof error.response?.data === 'string'
                    ? error.response.data
                    : error.response?.data?.Message || "";

            if (backendMessage.includes("ліміт")) {
                toast.error(backendMessage);
                setErrors({ global: backendMessage });

            } else if (backendMessage.toLowerCase().includes("номер")) {
                toast.error("Книга з таким інвентарним номером вже існує.");
                setErrors({ inventoryNumber: "Книга з таким інвентарним номером вже існує." });

            } else {
                toast.error("Помилка при додаванні книги.");
                setErrors({ global: "Помилка при додаванні книги: " + (backendMessage || error.message) });
            }


            console.error("Помилка при додаванні книги:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <Header name="Додати книгу" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            <form onSubmit={handleSubmit} className="container-for-card add-book">
                <div className="row-in-card">
                    <label>Назва</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Введіть текст..." required />
                    {errors.title && <div className="error-text">{errors.title}</div>}

                </div>
                <div className="row-in-card">
                    <label>Автор</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="input" placeholder="Введіть текст..." />
                    {errors.author && <div className="error-text">{errors.author}</div>}

                </div>
                <div className="row-in-card">
                    <label className="explanetion">*Якщо ввести кількість примірників, то інвентарний номер присвоїться автоматично до кожного, починаючи з останнього записаного. Якщо ввести інвентарний номер вручну, поле з кількістю примірників не потрібно заповнювати</label>
                </div>
                <div className="row-in-card">
                    <label>*Кількість примірників</label>
                    <input type="number" value={copies} onChange={handleCopiesChange} className="input" placeholder="Введіть кількість..." />
                    <label>*Інвентарний номер</label>
                    <input type="text" value={inventoryNumber} onChange={handleInventoryNumberChange} className="input" placeholder="Введіть інвентарний номер..." />
                    {errors.inventoryNumber && <div className="error-text">{errors.inventoryNumber}</div>}
                </div>
                <div className="row-in-card">
                    <label>Рік видання</label>
                    <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="input" placeholder="Введіть рік..." />
                    {errors.year && <div className="error-text">{errors.year}</div>}
                    <label>УДК</label>
                    <input type="text" value={udc} onChange={(e) => setUdc(e.target.value)} className="input" placeholder="Введіть УДК..." />
                    {errors.udc && <div className="error-text">{errors.udc}</div>}
                </div>
                <div className="row-in-card">
                    <label>УДК за формою документу</label>
                    <input type="text" value={udcForm} onChange={(e) => setUdcForm(e.target.value)} className="input" placeholder="Введіть УДК за формою..." />
                    {errors.udcForm && <div className="error-text">{errors.udcForm}</div>}
                    <label>Ціна примірника</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input" placeholder="Введіть ціну..." />
                    {errors.price && <div className="error-text">{errors.price}</div>}
                </div>
                <div className="row-in-card">
                    <label>Дата і номер супровідного документу</label>
                    <input type="text" value={accompanyingDoc} onChange={(e) => setAccompanyingDoc(e.target.value)} className="input" placeholder="Введіть дані..." />
                    {errors.accompanyingDoc && <div className="error-text">{errors.accompanyingDoc}</div>}
                </div>

                <Button name="Зберегти" color="purple-min" />
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </>
    );
};

export default AddBookPage;