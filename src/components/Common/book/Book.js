import React from 'react';
import './Book.css';
import Button from '../button/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isNaN(date)) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const Book = ({
    inventoryNumber,
    title,
    author,
    year,
    udc,
    udcForm,
    accompanyingDoc,
    price,
    removedBook,
    onDeleteBook,
    onRemoveBook
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleEditClick = () => {
        navigate(`/dashboard/edit-book/${inventoryNumber}`);
    };

    const displayOrPlaceholder = (value) => {
        if (value === null || value === undefined || value === '') return "-";
        return value;
    };

    const formattedRemovedDate = formatDate(removedBook);

    const isSearchBookPage = location.pathname.includes('search-book');

    return (
        <div className="book">
            <div className="col-2">
                <p className="inventory-number">{displayOrPlaceholder(inventoryNumber)}</p>
            </div>
            <div className="col-3">
                <h2>{displayOrPlaceholder(title)}</h2>
                <p><strong>Автор:</strong> {displayOrPlaceholder(author)}</p>
                <p><strong>Рік видання:</strong> {displayOrPlaceholder(year)}</p>
                <p><strong>УДК:</strong> {displayOrPlaceholder(udc)}</p>
                <p><strong>УДК за формою документа:</strong> {displayOrPlaceholder(udcForm)}</p>
                <p><strong>Супровідний документ:</strong> {displayOrPlaceholder(accompanyingDoc)}</p>
                <p><strong>Ціна:</strong> {price !== null && price !== undefined && price !== '' ? `${price} грн` : "-"}</p>
                {formattedRemovedDate && (
                    <p><strong>Дата списання:</strong> {formattedRemovedDate}</p>
                )}
            </div>
            <div className="col-4">
                <Button
                    onClick={() => onRemoveBook(inventoryNumber, title)}
                    name={isSearchBookPage ? "Списати" : "Відновити"}
                    color="yellow"
                />
                <Button onClick={handleEditClick} name="Редагувати" color="red" />
                <Button onClick={() => onDeleteBook(inventoryNumber, title)} name="Видалити" color="grey" />
            </div>
        </div>
    );
};

export default Book;
