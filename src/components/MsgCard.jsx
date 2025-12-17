import React from "react";
import "./MsgCard.css";

const MsgCard = ({ sender, email, msg, date, isActive, onClick }) => {
  return (
    <div
      className={`msg-card ${isActive ? "active" : ""}`}
      onClick={onClick} 
    >
      <div className="msg-avatar">{sender?.charAt(0)}</div>

      <div className="msg-content">
        <div className="msg-header">
          <p className="msg-sender">{sender}</p>
          <span className="msg-time">{date?.split("T")[0]}</span>
        </div>
        <p className="msg-role">{email}</p>
        <p className="msg-preview">{msg}</p>
        {/* ?.message */}
      </div>
    </div>
  );
};

export default MsgCard;


