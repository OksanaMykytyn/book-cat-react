import react from "react";
import Header from "../../components/Common/header/Header";


const ProfilePage = ({ toggleNavbar, isNavbarVisible }) => {
    return (
        <Header name="Профіль" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
    );

};

export default ProfilePage;