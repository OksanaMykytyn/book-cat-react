import react from "react";

import "./ToolsForBook.css";

const ToolsForBook = ({ totalBooks, totalPrice }) => {

    const amount = totalBooks ? totalBooks : 0;

    const totalAmount = totalPrice ? totalPrice : 0;

    return (
        <div className="tools-for-book">
            <div className="row-in-card">
                <p>Всього {amount} результатів</p>
                <p>Загальна сума: {totalAmount} грн</p>
            </div>
            {/* <div className="row-in-card">
                <div className="dropdown">Групові дії</div>
                <p>Обрано: 0</p>
            </div> */}
        </div>
    );
};

export default ToolsForBook;