import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Document from "../../components/Common/document/Document";

const CreateDocumentPage = ({ toggleNavbar, isNavbarVisible }) => {
    const [title, setTitle] = useState("");
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");

    const [documentFormat, setDocumentFormat] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [generatedDoc, setGeneratedDoc] = useState(null);


    const [errors, setErrors] = useState({});


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
                setUserImage(response.data.image);
            } catch (error) {
                console.error("Помилка при отриманні профілю користувача:", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!title.trim()) validationErrors.title = "Введіть назву документу";
        if (!documentFormat) validationErrors.documentFormat = "Оберіть формат документа";

        if (documentFormat === "writeOffAct") {
            if (!dateFrom) validationErrors.dateFrom = "Вкажіть початкову дату";
            if (!dateTo) validationErrors.dateTo = "Вкажіть кінцеву дату";
            if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
                validationErrors.dateRange = "Початкова дата не може бути пізнішою за кінцеву";
            }
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});


        try {
            const token = localStorage.getItem("token");

            const data = {
                name: title.trim(),
                format: documentFormat,
            };

            if (documentFormat === "writeOffAct") {
                data.dateFrom = dateFrom;
                data.dateTo = dateTo;
            }

            const response = await axios.post(
                'https://localhost:7104/api/document/create',
                data,
                {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setGeneratedDoc({
                blob: response.data,
                name: `${title.trim()}.docx`,
            });

            toast.success("Документ успішно створено");
            clearForm();

        } catch (error) {
            if (error.response) {
                const reader = new FileReader();
                reader.onload = () => {
                    toast.error(`Помилка: ${reader.result}`);
                };
                reader.readAsText(error.response.data);
            } else {
                toast.error("Сталася помилка при створенні документа");
            }
            console.error(error);
        }
    };

    const clearForm = () => {
        setTitle("");
        setDocumentFormat("");
        setDateFrom("");
        setDateTo("");
        setErrors({});
    };


    return (
        <>
            <Header name="Створити документ" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            <form className="container-for-card create-document" onSubmit={handleSubmit}>
                <div className="row-in-card">
                    <label className="text" htmlFor="title">Введіть назву документу</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <div className="error-text">{errors.title}</div>}
                </div>

                <div
                    className="row-in-card" style={{ width: "max-content" }}

                >
                    <p style={{ whiteSpace: "nowrap" }}>Оберіть формат:</p>


                    <input
                        type="checkbox"
                        checked={documentFormat === "writeOffAct"}
                        onChange={() => setDocumentFormat(documentFormat === "writeOffAct" ? "" : "writeOffAct")}
                    />
                    <label style={{ whiteSpace: "nowrap" }}>

                        Акт списання
                    </label>


                    <input
                        type="checkbox"
                        checked={documentFormat === "inventoryBook"}
                        onChange={() => setDocumentFormat(documentFormat === "inventoryBook" ? "" : "inventoryBook")}
                    />
                    <label style={{ whiteSpace: "nowrap" }} >

                        Інвентарна книга
                    </label>
                    {errors.documentFormat && <div className="error-text">{errors.documentFormat}</div>}
                </div>

                {documentFormat === "writeOffAct" && (
                    <div className="row-in-card">
                        <p>Оберіть діапазон дат з: </p>
                        <input
                            className="input"
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            max={dateTo || undefined}
                        />
                        {errors.dateFrom && (
                            <div className="error-text">{errors.dateFrom}</div>
                        )}
                        <p style={{ margin: "0 10px" }}>по</p>
                        <input
                            className="input"
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            min={dateFrom || undefined}
                        />
                        {errors.dateTo && (
                            <div className="error-text">{errors.dateTo}</div>
                        )}
                        {errors.dateRange && (
                            <div className="error-text">{errors.dateRange}</div>
                        )}
                    </div>
                )}

                <Button name="Створити документ" color="purple-min" type="submit" />
            </form>
            {generatedDoc && (
                <Document fileName={generatedDoc.name} fileBlob={generatedDoc.blob} />
            )}

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default CreateDocumentPage;
