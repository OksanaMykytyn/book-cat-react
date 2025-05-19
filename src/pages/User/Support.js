import react from "react";
import Header from "../../components/Common/header/Header";


const SupportPage = ({ toggleNavbar, isNavbarVisible }) => {
    return (
        <Header name="Підтримка" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
    );

};

export default SupportPage;