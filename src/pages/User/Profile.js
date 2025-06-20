import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";
import Divider from "../../components/Common/divider/Divider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";

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
    const [errors, setErrors] = useState({});

    const [plans, setPlans] = useState([]);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchSetupData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/library/setup", {
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

        const fetchPlans = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/plan", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });

                setPlans(response.data);
            } catch (error) {
                console.error("Помилка при отриманні тарифних планів:", error);
            }
        };

        fetchSetupData();
        fetchPlans();
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
        const validationErrors = {};

        const trimmedName = userName.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName) {
            validationErrors.userName = "Введіть назву користувача";
        } else if (trimmedName.length > 100) {
            validationErrors.userName = "Назва не повинна перевищувати 100 символів";
        }

        if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            validationErrors.email = "Некоректний формат електронної пошти";
        }

        if (imageFile && !imageFile.name.toLowerCase().endsWith(".jpg") && !imageFile.name.toLowerCase().endsWith(".jpeg")) {
            validationErrors.imageFile = "Дозволено лише .jpg або .jpeg зображення";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Перевірте правильність заповнення форми");
            return;
        }

        setErrors({});

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axiosInstance.put("/library/setup/text", {
                username: trimmedName,
                email: trimmedEmail,
                planId: planId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-Requested-From': 'BookCatApp'
                }
            });

            if (imageFile) {
                const imageForm = new FormData();
                imageForm.append("Image", imageFile);

                await axiosInstance.put("/library/setup/image", imageForm, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                        "X-Requested-From": "BookCatApp"
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
                        maxLength="100"
                        onChange={handleInputChange(setUserName)}
                    />
                    {errors.userName && <div className="error-text">{errors.userName}</div>}
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
                    {errors.email && <div className="error-text">{errors.email}</div>}
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
                    {errors.imageFile && <div className="error-text">{errors.imageFile}</div>}
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
                    <p className="tac">
                        <span
                            onClick={async () => {
                                const token = localStorage.getItem("token");
                                try {
                                    await axiosInstance.post("/user/logout", null, {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                            "X-Requested-From": "BookCatApp"
                                        }
                                    });
                                } catch (error) {
                                    console.error("Помилка при виході:", error);
                                }
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                            style={{
                                color: "#6a1b9a",
                                cursor: "pointer",
                                textDecoration: "underline"
                            }}
                        >
                            Вийти з акаунту
                        </span>
                    </p>
                </div>


                <div className="row-in-card">
                    <label>Ваш тарифний план:</label>
                </div>
                <div className="row-in-card">
                    <div className="form-group-with-three-card-elements">
                        {plans.map(plan => {
                            const isDisabled = booksCount > plan.maxBooks;
                            return (
                                <div
                                    key={plan.id}
                                    className={`form-group-with-three-card-element ${plan.id === planId ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                                    style={{
                                        cursor: isDisabled ? "not-allowed" : "pointer",
                                        opacity: isDisabled ? 0.5 : 1,
                                        pointerEvents: isDisabled ? "none" : "auto"
                                    }}
                                    onClick={() => {
                                        if (!isDisabled) {
                                            setPlanId(plan.id);
                                            setIsFormChanged(true);
                                        }
                                    }}
                                >
                                    <div className="form-group-with-three-card-element-count">
                                        До {plan.maxBooks.toLocaleString("uk-UA")} книг
                                    </div>
                                    <div className="form-group-with-three-card-element-price">
                                        {plan.price.toFixed(0)} грн / міс.
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <Button color="purple-min" name="Зберегти" onClick={handleSave} />
            </form>

            <ToastContainer />
        </>
    );
};

export default ProfilePage;
