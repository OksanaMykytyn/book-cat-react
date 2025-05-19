import React from "react";
import Button from "../button/Button";

const FormSearch = () => {
    return (
        <form className="container-for-card search-book">
            <div className="row-in-card">
                <label className="text">Назва</label>
                <input type="text" name="title" id="title" className="input" />
                <label className="text">Автор</label>
                <input type="text" name="title" id="title" className="input" />
            </div>
            <div className="row-in-card">
                <label className="text">Рік видання</label>
                <input type="text" name="title" id="title" className="input" />
                <label className="text">УДК</label>
                <input type="text" name="title" id="title" className="input" />
                <label className="text">УДК за формою док.</label>
                <input type="text" name="title" id="title" className="input" />
            </div>
            <div className="row-in-card">
                <label className="text">Дата і номер супровідного документу</label>
                <input type="text" name="title" id="title" className="input" />
            </div>
            <Button name="Пошук" color="purple-min" />
        </form>
    );
};

export default FormSearch;