import React, { useRef, useState } from "react";
import Header from "../../components/Common/header/Header";
import Button from "../../components/Common/button/Button";
import Divider from "../../components/Common/divider/Divider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";

const AddArticlePage = ({ toggleNavbar, isNavbarVisible }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageFileName, setImageFileName] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const handleSubmit = async () => {
        const validationErrors = {};

        if (!title.trim()) {
            validationErrors.title = "Введіть заголовок";
        }

        if (!slug.trim()) {
            validationErrors.slug = "Введіть слаг";
        }

        if (!content.trim()) {
            validationErrors.content = "Контент не може бути пустим";
        } else {
            try {
                JSON.parse(content);
            } catch (e) {
                validationErrors.content = "Контент має бути валідним JSON";
            }
        }

        if (imageFile && !imageFile.name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
            validationErrors.image = "Дозволено лише .jpg, .jpeg, .png або .gif зображення";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Виправте помилки у формі");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Необхідна авторизація");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('Title', title.trim());
            formData.append('Slug', slug.trim());
            formData.append('Content', content.trim());
            if (category.trim()) {
                formData.append('Category', category.trim());
            }

            if (imageFile) {
                formData.append('CoverImageFile', imageFile);
            }

            const response = await axiosInstance.post("/Article", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-Requested-From": "BookCatApp",
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Статтю додано успішно!");
            setTitle("");
            setContent("");
            setSlug("");
            setCategory("");
            setImageFile(null);
            setImageFileName("");
            setErrors({});
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Помилка при створенні статті:", error);
            const errorMessage = error.response?.data || "Невідома помилка";
            toast.error(`Помилка: ${errorMessage}`);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileName(file.name);
            if (errors.image) {
                setErrors(prevErrors => ({ ...prevErrors, image: null }));
            }
        }
    };

    return (
        <>
            <Header
                name="Додати статтю"
                onToggleNavbar={toggleNavbar}
                isNavbarVisible={isNavbarVisible}
            />
            <form className="container-for-card profile" onSubmit={(e) => e.preventDefault()}>
                <div className="row-in-card">
                    <label htmlFor="title">Заголовок</label>
                    <input
                        className="input"
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={200}
                    />
                    {errors.title && <div className="error-text">{errors.title}</div>}
                </div>
                <div className="row-in-card">
                    <label htmlFor="slug">Слаг (slug)</label>
                    <input
                        className="input"
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />
                    {errors.slug && <div className="error-text">{errors.slug}</div>}
                </div>
                <div className="row-in-card">
                    <label htmlFor="category">Категорія</label>
                    <input
                        className="input"
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="row-in-card">
                    <label htmlFor="content">Контент (JSON)</label>
                    <textarea
                        className="input article-content"
                        id="content"
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='{"blocks": [...]}'
                    />
                    {errors.content && <div className="error-text">{errors.content}</div>}
                </div>
                <Divider />
                <div className="row-in-card">
                    <label>Зображення (необов’язково)</label>
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
                        value={imageFileName}
                        readOnly
                        placeholder="Завантажте зображення..."
                    />
                    {errors.image && <div className="error-text">{errors.image}</div>}
                    <Button
                        color="white-min-for-profile"
                        name={imageFileName ? "Змінити" : "Додати"}
                        onClick={openFileDialog}
                    />
                </div>
                <Button color="purple-min" name="Зберегти статтю" onClick={handleSubmit} />
            </form>
            <ToastContainer />
        </>
    );
};

export default AddArticlePage;