import React from "react";

import "./MessageItem.css";

import profileImage from '../../../assets/image/avatar.png';


const MessageItem = ({ avatar, text, senderType }) => {
    const userAvatar = avatar ? `https://localhost:7104/${avatar}` : profileImage;
    const positionClass = senderType == 'library' ? "right" : senderType == "admin" ? "left" : "";
    return (
        <div className={`message ${positionClass}`}>
            <img src={userAvatar} alt="avatar" className="message-img" />
            <div className="container-for-message">
                <span>{text}</span>
            </div>
        </div>
    );
};
export default MessageItem;