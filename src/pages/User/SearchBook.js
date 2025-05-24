import React, { useState, useEffect } from 'react';
import Header from "../../components/Common/header/Header";
import ListBook from "../../components/Common/list-book/ListBook";
import FormSearch from '../../components/Common/form-search/form-search';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBookPage = ({ onRemoveBook, onDeleteBook, toggleNavbar, isNavbarVisible }) => {

    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useState({});
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchBooks(currentPage, searchParams);
    }, [currentPage, searchParams]);


    const booksPerPage = 20;

    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    const fetchBooks = async (page, filters = {}) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`https://localhost:7104/api/book/list`, {
                params: {
                    page,
                    limit: booksPerPage,
                    ...filters
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = response.data;

            const adaptedBooks = data.books.map(book => ({
                inventoryNumber: book.inventoryNumber,
                title: book.name,
                author: book.author,
                year: book.yearPublishing,
                udc: book.udc || '',
                udcForm: book.udcFormDocument || '',
                accompanyingDoc: book.checkDocument || '',
                price: book.price,
                removedBook: book.removed
            }));

            setBooks(adaptedBooks);
            setTotalPages(data.totalPages);
            setTotalBooks(data.totalBooks);
            setTotalPrice(data.totalPrice);

        } catch (error) {
            console.error("Помилка при завантаженні книг:", error);
        }
    };

    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axios.get("https://localhost:7104/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setUserName(response.data.username);
            } catch (error) {
                console.error("Помилка при отриманні профілю користувача:", error);
            }
        };

        fetchUserProfile();
    }, []);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (params) => {
        setSearchParams(params);
        setCurrentPage(1);
    };


    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        backgroundColor: i === currentPage ? '#ccc' : '#fff',
                        border: '1px solid #999'
                    }}
                >
                    {i}
                </button>
            );
        }
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>{pages}</div>;
    };

    const removeBook = async (inventoryNumber, bookName) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(`https://localhost:7104/api/book/remove/${inventoryNumber}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-Requested-From': 'BookCatApp'
                }
            });

            toast.success(`Книга "${bookName}" успішно списана.`);
            fetchBooks(currentPage);
        } catch (error) {
            console.error("Помилка при списанні книги:", error);
            toast.error("Не вдалося списати книгу.");
        }
    };

    const deleteBook = async (inventoryNumber, bookName) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`https://localhost:7104/api/book/delete/${inventoryNumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-Requested-From': 'BookCatApp'
                }
            });

            toast.success(`Книга "${bookName}" успішно видалена.`);
            fetchBooks(currentPage);
        } catch (error) {
            console.error("Помилка при видаленні книги:", error);
            toast.error("Не вдалося видалити книгу.");
        }
    };

    return (
        <>
            <Header name="Пошук по книгах" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} />
            <FormSearch onSearch={handleSearch} />
            <ListBook
                books={books}
                onDeleteBook={deleteBook}
                onRemoveBook={removeBook}
                totalBooks={totalBooks}
                totalPrice={totalPrice}
            />

            {renderPagination()}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </>
    );
};

export default SearchBookPage;
