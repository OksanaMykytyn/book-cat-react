import react from "react";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";

const CreateDocumentPage = ({ toggleNavbar, isNavbarVisible }) => {
    return (
        <>
            <Header name="Створити документ" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
            <form className="container-for-card create-document">
                <div className="row-in-card">
                    <label className="text">Введіть назву документу</label>
                    <input type="text" name="title" id="title" className="input" />
                </div>
                <Button name="Пошук" color="purple-min" />
            </form>
        </>

    );
};

export default CreateDocumentPage;