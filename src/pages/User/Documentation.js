import react from "react";
import Header from "../../components/Common/header/Header";


const DocumentationPage = ({ toggleNavbar, isNavbarVisible }) => {
    return (
        <Header name="Довідка" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
    );

};

export default DocumentationPage;