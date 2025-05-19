import React from 'react';
import './Book.css';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const Book = ({
    inventoryNumber,
    title,
    author,
    year,
    udc,
    udcForm,
    accompanyingDoc,
    price,
    removeBook,
    isChecked,
    onCheckboxChange,
    onDeleteBook,
    onRemoveBook
}) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/dashboard/edit-book/${inventoryNumber}`);
    };
    return (
        <div className="book">
            <div className="col-1">
                <input
                    type="checkbox"
                    className="user-checkbox"
                    checked={isChecked}
                    onChange={onCheckboxChange}
                />
            </div>
            <div className="col-2">
                <p className="inventory-number">{inventoryNumber}</p>
            </div>
            <div className="col-3">
                <h2>{title}</h2>
                <p><strong>Автор:</strong> {author}</p>
                <p><strong>Рік видання:</strong> {year}</p>
                <p><strong>УДК:</strong> {udc}</p>
                <p><strong>УДК за формою документа:</strong> {udcForm}</p>
                <p><strong>Супровідний документ:</strong> {accompanyingDoc}</p>
                <p><strong>Ціна:</strong> {price} грн</p>
            </div>
            <div className="col-4">
                <Button onClick={() => onRemoveBook(inventoryNumber)} name="Списати" color="yellow" />
                <Button onClick={handleEditClick} name="Редагувати" color="red" />
                <Button onClick={() => onDeleteBook(inventoryNumber)} name="Видалити" color="grey" />
            </div>
        </div>
    );
};

export default Book;