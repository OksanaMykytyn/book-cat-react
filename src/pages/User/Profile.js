import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";
import Divider from "../../components/Common/divider/Divider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const plans = [
    { id: 1, title: "До 15 тис. книг", price: "100 грн / міс." },
    { id: 2, title: "До 30 тис. книг", price: "200 грн / міс." },
    { id: 3, title: "До 40 тис. книг", price: "360 грн / міс." }
];

const ProfilePage = ({ toggleNavbar, isNavbarVisible }) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [booksCount, setBooksCount] = useState(0);
    const [maxBooks, setMaxBooks] = useState(0);
    const [planId, setPlanId] = useState(null);
    const [planEndDate, setPlanEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [userImage, setUserImage] = useState("");

    const [isFormChanged, setIsFormChanged] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchSetupData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axios.get("https://localhost:7104/api/library/setup", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });

                const data = response.data;
                setUserName(data.username);
                setEmail(data.login);
                setUserImage(data.image);
                setImageUrl(data.image ? data.image.split("/").pop() : "");
                setBooksCount(data.booksCount);
                setMaxBooks(data.maxBooks);
                setPlanId(data.planId);
                setPlanEndDate(data.planEndDate ? new Date(data.planEndDate).toLocaleDateString("uk-UA") : "");
                setStatus(data.status || "");
            } catch (error) {
                console.error("Помилка при отриманні даних бібліотеки:", error);
            }
        };

        fetchSetupData();
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isFormChanged) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isFormChanged]);

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axios.put("https://localhost:7104/api/library/setup/text", {
                username: userName,
                email: email,
                planId: planId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (imageFile) {
                const imageForm = new FormData();
                imageForm.append("Image", imageFile);

                await axios.put("https://localhost:7104/api/library/setup/image", imageForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
            }

            toast.success("Профіль успішно оновлено! Щоб відобразилися зміни перезавантажте сторінку!");
            setIsFormChanged(false);
        } catch (error) {
            console.error("Помилка при оновленні профілю:", error);
            toast.error("Помилка при оновленні профілю");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageUrl(file.name);
            setIsFormChanged(true);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setIsFormChanged(true);
    };

    return (
        <>
            <Header
                name="Профіль"
                onToggleNavbar={toggleNavbar}
                isNavbarVisible={isNavbarVisible}
                userName={userName}
                userImage={userImage}
            />

            <form className="container-for-card profile" onSubmit={(e) => e.preventDefault()}>
                <div className="row-in-card">
                    <label htmlFor="libraryName">Назва школи або бібліотеки</label>
                    <input
                        className="input"
                        type="text"
                        id="libraryName"
                        value={userName}
                        onChange={handleInputChange(setUserName)}
                    />
                </div>
                <div className="row-in-card">
                    <label htmlFor="email">Електронна пошта</label>
                    <input
                        className="input"
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleInputChange(setEmail)}
                    />
                </div>
                <div className="row-in-card">
                    <label>Завантажити фото</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <input
                        className="input"
                        type="text"
                        value={imageUrl}
                        readOnly
                        placeholder={!imageUrl ? "Завантажте зображення..." : ""}
                    />
                    <Button
                        color="white-min-for-profile"
                        name={imageUrl ? "Змінити" : "Додати"}
                        onClick={openFileDialog}
                    />
                </div>

                <Divider />

                <div className="row-in-card">
                    <p className="tac">Додано {booksCount} книг / Залишилося {maxBooks - booksCount} книг</p>
                </div>

                <div className="row-in-card">
                    {status === "active" ? (
                        <p className="tac">Дата наступної оплати: {planEndDate}</p>
                    ) : (
                        <p className="tac" style={{ color: "red" }}>Акаунт обмежений у можливостях</p>
                    )}
                </div>

                <div className="row-in-card">
                    <label>Ваш тарифний план:</label>
                </div>
                <div className="row-in-card">
                    <div className="form-group-with-three-card-elements">
                        {plans.map(plan => (
                            <div
                                key={plan.id}
                                className={`form-group-with-three-card-element ${plan.id === planId ? "selected" : ""}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setPlanId(plan.id);
                                    setIsFormChanged(true);
                                }}
                            >
                                <div className="form-group-with-three-card-element-count">{plan.title}</div>
                                <div className="form-group-with-three-card-element-price">{plan.price}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <Button color="purple-min" name="Зберегти" onClick={handleSave} />
            </form>

            <ToastContainer />
        </>
    );
};

export default ProfilePage;
