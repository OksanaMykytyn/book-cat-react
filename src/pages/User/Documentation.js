import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Common/header/Header";


const DocumentationPage = ({ toggleNavbar, isNavbarVisible }) => {

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

    return (
        <Header name="Довідка" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} />
    );

};

export default DocumentationPage;