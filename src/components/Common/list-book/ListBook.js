import React, { useState } from 'react';
import Book from '../book/Book';
import './ListBook.css';
import Divider from '../divider/Divider';
import ToolsForBook from '../tools-for-book/ToolsForBook';

const ListBook = ({ books, onDeleteBook, onRemoveBook, totalBooks, totalPrice }) => {

    const [selectedBooks, setSelectedBooks] = useState([]);

    const handleBookClick = (book) => {
        setSelectedBooks(prevSelectedBooks => {
            if (prevSelectedBooks.includes(book)) {
                return prevSelectedBooks.filter(b => b !== book);
            } else {
                return [...prevSelectedBooks, book];
            }
        });
    };


    return (
        <div className="list-book">
            <ToolsForBook totalBooks={totalBooks} totalPrice={totalPrice} />
            {books.map((book, index) => (
                <React.Fragment key={book.inventoryNumber}>
                    <div
                        style={{
                            backgroundColor: selectedBooks.includes(book) ? '#EDE3FF' : 'transparent',
                        }}
                    >
                        <Book
                            inventoryNumber={book.inventoryNumber}
                            title={book.title}
                            author={book.author}
                            year={book.year}
                            udc={book.udc}
                            udcForm={book.udcForm}
                            accompanyingDoc={book.accompanyingDoc}
                            price={book.price}
                            removedBook={book.removedBook}
                            isChecked={selectedBooks.includes(book)}
                            onCheckboxChange={() => handleBookClick(book)}
                            onDeleteBook={onDeleteBook}
                            onRemoveBook={onRemoveBook}
                        />
                    </div>
                    {index < books.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ListBook;