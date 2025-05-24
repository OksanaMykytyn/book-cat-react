import React, { useState } from "react";
import Button from "../button/Button";

const FormSearchForRemoved = ({ onSearch }) => {

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        year: "",
        udc: "",
        udcForm: "",
        accompanyingDoc: "",
        removed: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(formData);
    };

    return (
        <form className="container-for-card search-book" onSubmit={handleSubmit}>
            <div className="row-in-card">
                <label className="text">Назва</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="input" placeholder="Введіть назву..." />
                <label className="text">Автор</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} className="input" placeholder="Введіть автора..." />
            </div>
            <div className="row-in-card">
                <label className="text">Рік видання</label>
                <input type="text" name="year" value={formData.year} onChange={handleChange} className="input" placeholder="Введіть рік..." />
                <label className="text">УДК</label>
                <input type="text" name="udc" value={formData.udc} onChange={handleChange} className="input" placeholder="Введіть УДК..." />
                <label className="text">УДК за формою док.</label>
                <input type="text" name="udcForm" value={formData.udcForm} onChange={handleChange} className="input" placeholder="Введіть УДК за ф. док..." />
            </div>
            <div className="row-in-card">
                <label className="text">Дата і номер супровідного документу</label>
                <input type="text" name="accompanyingDoc" value={formData.accompanyingDoc} onChange={handleChange} className="input" placeholder="Введіть дані накладної..." />
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