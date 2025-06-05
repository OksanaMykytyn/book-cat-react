import React from "react";
import Button from "../button/Button";
import './Document.css';

const Document = ({ fileName, fileBlob, fileUrl }) => {
    const handleDownload = () => {
        if (fileBlob instanceof Blob) {
            const url = URL.createObjectURL(fileBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } else if (typeof fileUrl === 'string') {
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.error("Немає даних для завантаження документа.");
        }
    };

    return (
        <div className="container-for-card document">
            <div className="document-title">{fileName}</div>
            <Button name="Завантажити" color="purple-min" onClick={handleDownload} />
        </div>
    );
};

export default Document;
