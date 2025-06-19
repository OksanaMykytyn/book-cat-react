import React, { useState } from "react";
import Button from "../button/Button";
import { toast } from "react-toastify";

const FormSearchForRemoved = ({ onSearch }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        year: "",
        udc: "",
        udcForm: "",
        accompanyingDoc: "",
        inventoryNumber: "",
        removed: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateFields = () => {
        const newErrors = {};
        const hasAnyValue = Object.values(formData).some(value => value.trim() !== "");

        if (!hasAnyValue) {
            newErrors.global = "Потрібно заповнити хоча б одне поле для пошуку.";
        }

        if (formData.year && (!/^\d{4}$/.test(formData.year) || +formData.year < 1800 || +formData.year > 2100)) {
            newErrors.year = "Рік повинен бути 4-значним числом між 1800 і 2100.";
        }

        if (formData.inventoryNumber && (!/^\d+$/.test(formData.inventoryNumber) || formData.inventoryNumber.length > 50)) {
            newErrors.inventoryNumber = "Інвентарний номер повинен містити тільки цифри та бути до 50 символів.";
        }

        if (formData.title.length > 255) {
            newErrors.title = "Назва не повинна перевищувати 255 символів.";
        }

        if (formData.author.length > 255) {
            newErrors.author = "Автор не повинен перевищувати 255 символів.";
        }

        if (formData.udc.length > 100) {
            newErrors.udc = "УДК не повинен перевищувати 100 символів.";
        }

        if (formData.udcForm.length > 100) {
            newErrors.udcForm = "УДК за формою не повинен перевищувати 100 символів.";
        }

        if (formData.accompanyingDoc.length > 255) {
            newErrors.accompanyingDoc = "Супровідний документ повинен бути до 255 символів.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateFields()) {
            toast.error("Виправте помилки у формі пошуку.");
            return;
        }
        onSearch(formData);
    };

    return (
        <form className="container-for-card search-book" onSubmit={handleSubmit}>
            {errors.global && <div className="error-text">{errors.global}</div>}

            <div className="row-in-card">
                <label className="text">Назва</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="input" placeholder="Введіть назву..." />
                {errors.title && <div className="error-text">{errors.title}</div>}

                <label className="text">Автор</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} className="input" placeholder="Введіть автора..." />
                {errors.author && <div className="error-text">{errors.author}</div>}
            </div>

            <div className="row-in-card">
                <label className="text">Рік видання</label>
                <input type="text" name="year" value={formData.year} onChange={handleChange} className="input" placeholder="Введіть рік..." />
                {errors.year && <div className="error-text">{errors.year}</div>}

                <label className="text">УДК</label>
                <input type="text" name="udc" value={formData.udc} onChange={handleChange} className="input" placeholder="Введіть УДК..." />
                {errors.udc && <div className="error-text">{errors.udc}</div>}

                <label className="text">УДК за формою док.</label>
                <input type="text" name="udcForm" value={formData.udcForm} onChange={handleChange} className="input" placeholder="Введіть УДК за ф. док..." />
                {errors.udcForm && <div className="error-text">{errors.udcForm}</div>}
            </div>

            <div className="row-in-card">
                <label className="text">Дата і номер супровідного документу</label>
                <input type="text" name="accompanyingDoc" value={formData.accompanyingDoc} onChange={handleChange} className="input" placeholder="Введіть дані накладної..." />
                {errors.accompanyingDoc && <div className="error-text">{errors.accompanyingDoc}</div>}

                <label className="text">Інвентарний номер</label>
                <input type="text" name="inventoryNumber" value={formData.inventoryNumber} onChange={handleChange} className="input" placeholder="Введіть інвентарний номер..." />
                {errors.inventoryNumber && <div className="error-text">{errors.inventoryNumber}</div>}
            </div>

            <div className="row-in-card">
                <label className="text">Дата списання</label>
                <input
                    type="date"
                    name="removed"
                    value={formData.removed}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <Button name="Пошук" color="purple-min" />
        </form>
    );
};

export default FormSearchForRemoved;
