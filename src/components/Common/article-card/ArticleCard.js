import React from "react";
import Button from "../button/Button";
import { Link } from "react-router-dom";

import './ArticleCard.css';

import defaultArticleImage from '../../../assets/image/top_image.jpg';

const ArticleCard = ({ article }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA');
    };

    const articleImage = article.coverImage
        ? `https://localhost:7104${article.coverImage}`
        : defaultArticleImage;

    return (
        <div className="article-card">
            <img src={articleImage} alt={article.title} />

            <div className="article-card-tag-and-date">
                {article.category && <div className="article-card-tag">#{article.category}</div>}
                <div className="article-card-date">{formatDate(article.createdAt)}</div>
            </div>

            <h2 className="article-card-title">{article.title}</h2>

            <Link to={`/blog/${article.slug}`}>
                <Button name="Читати" color="purple-read-more" />
            </Link>
        </div>
    );
};

export default ArticleCard;