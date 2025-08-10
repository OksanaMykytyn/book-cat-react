import React, { useEffect, useState } from "react";
import Header from "../components/Landing/header/Header";
import ArticleCard from "../components/Common/article-card/ArticleCard";
import axiosInstance from "../axiosInstance";

import Seo from "../components/Common/seo/Seo";

const BlogPage = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get("/Article", {
                    headers: {
                        "X-Requested-From": "BookCatApp"
                    }
                });
                setArticles(response.data);
            } catch (err) {
                console.error("Помилка при завантаженні статей:", err);
                setError("Не вдалося завантажити статті.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <>
            <Seo
                title="Блог - BookCatalog"
                description="Переглядайте та читайте статті про користування нашою власною АБІС, як працювати з УДК та багато іншого."
                keywords="каталог книг, бібліотека, книги, управління колекцією"
            />
            <div className="blog">
                <Header />
                <h1 className="name-page">Блог</h1>
                <div className="container-for-articles">
                    {isLoading && <p>Завантаження статей...</p>}
                    {error && <p className="error-text">{error}</p>}

                    {!isLoading && !error && articles.length > 0 ? (
                        articles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))
                    ) : (
                        !isLoading && !error && <p>Наразі немає статей.</p>
                    )}
                </div>
                <footer>
                    Авторські права захищено.
                </footer>
            </div>
        </>
    );
};

export default BlogPage;