import React, { useState, useEffect } from 'react';

import Header from "../../components/Common/header/Header";
import ListBook from "../../components/Common/list-book/ListBook";
import FormSearchForRemoved from "../../components/Common/form-search/FormSearchForRemoved";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../axiosInstance';

const RemovedBookPage = ({ toggleNavbar, isNavbarVisible }) => {

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

    const fetchBooks = async (page, filters = {}) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axiosInstance.get(`/book/list-removed`, {
                params: {
                    page,
                    limit: booksPerPage,
                    ...filters
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-Requested-From': 'BookCatApp'
                }
            });

            const data = response.data;

            const adaptedBooks = data.books.map(book => ({
                inventoryNumber: book.inventoryNumber,
                title: book.name,
                author: book.author,
                year: book.yearPublishing,
                udc: book.udk || '',
                udcForm: book.udkFormDocument || '',
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
                        margin: '6px 5px',
                        padding: '5px 10px',
                        backgroundColor: i === currentPage ? '#673AB7' : '#fff',
                        color: i === currentPage ? '#fff' : 'black',
                        border: '1px solid #999',
                        borderRadius: '8px'
                    }}
                >
                    {i}
                </button>
            );
        }
        return <div style={{ textAlign: 'center', margin: '20px auto 20px auto' }}>{pages}</div>;
    };

    const removeBook = async (inventoryNumber, bookName) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axiosInstance.put(`/book/unremove/${inventoryNumber}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-Requested-From': 'BookCatApp'
                }
            });

            toast.success(`Книгу "${bookName}" успішно повернена зі списку списання.`);
            fetchBooks(currentPage);
        } catch (error) {
            console.error("Помилка при списанні книги:", error);
            toast.error(`Книгу "${bookName}" не вдалося повернути зі списку списаних книг.`);
        }
    };

    const deleteBook = async (inventoryNumber, bookName) => {
        try {
            const token = localStorage.getItem("token");

            await axiosInstance.delete(`/book/delete/${inventoryNumber}`, {
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
            <Header name="Списані книги" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            <FormSearchForRemoved onSearch={handleSearch} />
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

export default RemovedBookPage;