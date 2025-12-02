import React from "react";
import { Mail } from "lucide-react";
import "./MsgCard.css";

const MsgCard = ({ msg, isActive, onClick }) => {
  return (
    <div 
      className={`msg-card ${isActive ? 'active' : ''} ${msg.unread ? 'unread' : ''}`}
      onClick={onClick}
    >
      <div className="msg-avatar">
        <span>{msg.sender.charAt(0)}</span>
      </div>
      
      <div className="msg-content">
        <div className="msg-header">
          <h4 className="msg-sender">{msg.sender}</h4>
          <span className="msg-time">{msg.time}</span>
        </div>
        
        <p className="msg-role">{msg.role}</p>
        <p className="msg-preview">
          {msg.preview.length > 60 ? msg.preview.slice(0, 60) + '...' : msg.preview}
        </p>
        
        {msg.unread && <span className="unread-badge">New</span>}
      </div>
      
      <div className="msg-actions">
        <button className="msg-action-btn">
          <Mail size={16} />
        </button>
      </div>
    </div>
  );
};

export default MsgCard;

