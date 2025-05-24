import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Common/header/Header";
import Document from "../../components/Common/document/Document";

const AllDocumentPage = ({ toggleNavbar, isNavbarVisible }) => {
    const [documents, setDocuments] = useState([]);

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


    useEffect(() => {
        const fetchDocuments = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axios.get("https://localhost:7104/api/document/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setDocuments(response.data);
            } catch (error) {
                console.error("Помилка при завантаженні документів:", error);
            }
        };

        fetchDocuments();
    }, []);

    return (
        <>
            <Header name="Збережені документи" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} />

            {documents.length === 0 ? (
                <div className="container-for-card">
                    <p>Документів ще немає</p>
                </div>
            ) : (
                documents.map((doc, index) => (
                    <Document
                        key={index}
                        fileName={doc.name.endsWith(".docx") ? doc.name : `${doc.name}.docx`}
                        fileUrl={`https://localhost:7104${doc.url}`}
                    />
                ))
            )}

        </>
    );
};

export default AllDocumentPage;
