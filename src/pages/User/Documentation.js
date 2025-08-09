import React, { useState, useEffect } from "react";
import Header from "../../components/Common/header/Header";
import axiosInstance from "../../axiosInstance";
import "../../styles/Dashboard.css";
import renderContent from "../../components/Landing/render-article/RenderContent";

const DocumentationPage = ({ toggleNavbar, isNavbarVisible }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/user/profile", {
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

        const fetchDocumentationArticle = async () => {
            const token = localStorage.getItem("token");
            const headers = {
                'X-Requested-From': 'BookCatApp'
            };
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            try {
                const response = await axiosInstance.get("/article/yak-pravylno-znajty-udk-dlya-temy-naukovoyi-statti", { headers });

                const fetchedArticle = response.data;
                if (fetchedArticle && typeof fetchedArticle.content === 'string') {
                    try {
                        fetchedArticle.contentBlocks = JSON.parse(fetchedArticle.content).contentBlocks;
                    } catch (e) {
                        console.error("Помилка при парсингу JSON контенту:", e);
                        fetchedArticle.contentBlocks = [];
                    }
                } else if (fetchedArticle) {
                    fetchedArticle.contentBlocks = fetchedArticle.content?.contentBlocks || [];
                }
                setArticle(fetchedArticle);
            } catch (err) {
                console.error("Помилка при завантаженні статті:", err);
                if (err.response && err.response.status === 404) {
                    setError("Статтю не знайдено.");
                } else {
                    setError("Не вдалося завантажити статтю. Спробуйте пізніше.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
        fetchDocumentationArticle();
    }, []);

    const legendItems = (article?.contentBlocks || [])
        .filter(block => block.type == 'h2')
        .map((block, index) => ({
            id: `heading-${index}`,
            text: block.data.text,
            type: block.type
        }));

    const handleScrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return <div className="spinner" />;
    }

    if (error) {
        return (
            <>
                <Header name="Довідка" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
                <div className="container-for-card documentation-page">
                    <p className="error-text">{error}</p>
                </div>
            </>
        );
    }

    if (!article) {
        return (
            <>
                <Header name="Довідка" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
                <div className="container-for-card documentation-page">
                    <p>Статтю не знайдено.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header name="Довідка" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            <div className="container-for-card documentation-page">
                <h2>Зміст</h2>
                <ul className="toc">
                    {legendItems.map((item, index) => (
                        <li key={index} className={`${item.type}`}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleScrollToElement(item.id);
                                }}
                            >
                                {index + 1}. {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="section article-content">
                    {renderContent(article.contentBlocks)}
                </div>
            </div>
        </>
    );
};

export default DocumentationPage;