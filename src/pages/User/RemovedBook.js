import react from "react";

import Header from "../../components/Common/header/Header";
import ListBook from "../../components/Common/list-book/ListBook";
import FormSearchForRemoved from "../../components/Common/form-search/FormSearchForRemoved";

const RemovedBookPage = ({ books, onRemoveBook, onDeleteBook, toggleNavbar, isNavbarVisible }) => {
    return (
        <>
            <Header name="Списані книги" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
            <FormSearchForRemoved />
            <ListBook books={books} onDeleteBook={onDeleteBook} onRemoveBook={onRemoveBook} />

        </>
    );
};

export default RemovedBookPage;