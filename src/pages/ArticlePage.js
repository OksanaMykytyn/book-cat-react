import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Landing/header/Header";
import axiosInstance from "../axiosInstance";
import defaultArticleImage from '../assets/image/top_image.jpg';
import renderContent from "../components/Landing/render-article/RenderContent";

import Seo from "../components/Common/seo/Seo";
import { articlesSeoData } from "../seo/ArticleSeoData";

const ArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(slug);
        const fetchArticle = async () => {
            try {
                const response = await axiosInstance.get(`/article/${slug}`, {
                    headers: {
                        "X-Requested-From": "BookCatApp"
                    }
                });

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

        if (slug) {
            fetchArticle();
        }
    }, [slug]);

    if (isLoading) {
        return <p>Завантаження статті...</p>;
    }

    if (error) {
        return <p className="error-text">{error}</p>;
    }

    if (!article) {
        return <p>Статтю не знайдено.</p>;
    }

    const seoData = articlesSeoData[slug] || { title: article.title, description: "Стаття на BookCat" };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA');
    };

    const articleImage = article.coverImage
        ? article.coverImage
        : defaultArticleImage;

    const legendItems = (article.contentBlocks || [])
        .filter(block => block.type === 'h2')
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

    return (
        <div className="article">
            <Seo
                title={seoData.title}
                description={seoData.description}
                ogTitle={seoData.title}
                ogDescription={seoData.description}
            />
            <Header />
            <div className="article-data">
                <div className="article-data-all">
                    <div className="article-data-tag-and-date">
                        {article.category && <div className="article-data-tag">#{article.category}</div>}
                        <div className="article-data-date">{formatDate(article.createdAt)}</div>
                    </div>
                    <h1 className="article-data-title">{article.title}</h1>
                </div>
                <img src={articleImage} alt={article.title} className="article-data-img" />
            </div>

            <div className="article-main">
                <div className="article-legend">
                    {legendItems.length > 0 && (
                        <>
                            <div className="article-legend-title">Зміст</div>
                            <ol className="article-legend-list">
                                {legendItems.map((item, index) => (
                                    <li key={index} className={`article-legend-list-item ${item.type}`}>
                                        <a
                                            href={`#${item.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleScrollToElement(item.id);
                                            }}
                                        >
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </>
                    )}
                </div>

                <div className="article-content">
                    {renderContent(article.contentBlocks)}
                </div>
            </div>

            <footer>
                Авторські права захищено.
            </footer>
        </div>
    );
};

export default ArticlePage;