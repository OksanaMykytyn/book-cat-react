import react from "react";

import Button from "../button/Button";
import './Document.css';

const Document = () => {
    return (
        <div className="container-for-card document">
            <div className="document-title">Акт списана.doc</div>
            <Button name="Завантажити" color="purple-min" />
        </div>
    );

};

export default Document;