import React, { useState } from 'react';
import Header from "../../components/Common/header/Header";
import ListBook from "../../components/Common/list-book/ListBook";

const SearchBookPage = ({ books, onRemoveBook, onDeleteBook, toggleNavbar, isNavbarVisible }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBooks = (books || []).filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header name="Пошук по книгах" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
            <form className="container-for-card search-book">
                <div className="row-in-card">
                    <label className="text">Пошук</label>
                    <input type="text" name="title" id="title" className="input" placeholder="Пошук за назвою або автором..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </form>
            <ListBook books={filteredBooks} onDeleteBook={onDeleteBook} onRemoveBook={onRemoveBook} />
        </>
    );
};

export default SearchBookPage;


// import react from "react";

// import Header from "../../components/Common/header/Header";
// import FormSearch from "../../components/Common/form-search/form-search";
// import ListBook from "../../components/Common/list-book/ListBook";

// const SearchBookPage = () => {

//     const books = [
//         {
//             inventoryNumber: "39403",
//             title: "1984",
//             author: "Джордж Оруелл",
//             year: 1949,
//             udc: "821.111",
//             udcForm: "Антиутопія",
//             accompanyingDoc: "Немає",
//             price: 250,
//         },
//         {
//             inventoryNumber: "39404",
//             title: "Гаррі Поттер і філософський камінь",
//             author: "Джоан Роулінг",
//             year: 1997,
//             udc: "821.111",
//             udcForm: "Фентезі",
//             accompanyingDoc: "Немає",
//             price: 200,
//         },
//         {
//             inventoryNumber: "39405",
//             title: "Убити пересмішника",
//             author: "Харпер Лі",
//             year: 1960,
//             udc: "821.111",
//             udcForm: "Роман",
//             accompanyingDoc: "Немає",
//             price: 240,
//         },
//         {
//             inventoryNumber: "39406",
//             title: "451 градус за Фаренгейтом",
//             author: "Рей Бредбері",
//             year: 1953,
//             udc: "821.111",
//             udcForm: "Наукова фантастика",
//             accompanyingDoc: "Немає",
//             price: 260,
//         },
//         {
//             inventoryNumber: "39407",
//             title: "Маленький принц",
//             author: "Антуан де Сент-Екзюпері",
//             year: 1943,
//             udc: "841.512",
//             udcForm: "Дитяча література",
//             accompanyingDoc: "Немає",
//             price: 180,
//         },
//     ];

//     return (
//         <>
//             <Header name="Пошук по книгах" />
//             <FormSearch />
//             <ListBook books={books} />
//         </>
//     );
// };

// export default SearchBookPage;