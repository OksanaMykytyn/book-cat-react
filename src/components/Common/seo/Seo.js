import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, keywords, ogTitle, ogDescription }) => {
    return (
        <Helmet>
            {/* Основні метатеги */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Метатеги для Open Graph (соцмережі) */}
            <meta property="og:title" content={ogTitle || title} />
            <meta property="og:description" content={ogDescription || description} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

export default Seo;