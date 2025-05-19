import react from "react";
import Header from "../../components/Common/header/Header";


const SettingsPage = ({ toggleNavbar, isNavbarVisible }) => {
    return (
        <Header name="Налаштування" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
    );

};

export default SettingsPage;