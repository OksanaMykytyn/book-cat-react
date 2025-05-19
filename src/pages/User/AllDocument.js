import react from "react";
import Header from "../../components/Common/header/Header";

import Document from "../../components/Common/document/Document";

const AllDocumentPage = ({ toggleNavbar, isNavbarVisible }) => {
    return (
        <>
            <Header name="Збережені документи" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
            <Document />
            <Document />
            <Document />
        </>
    );

};

export default AllDocumentPage;