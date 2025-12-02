import React from 'react';
import './MsgCard.css';

const MsgCard = (props) => {

  const msg = props.msg;
  const isActive = props.isActive;
  const onClick = props.onClick;

  return (
    <div 
      className={`message-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="msg-header">
        <span className="msg-sender">{msg.sender}</span>
        <span className="msg-date">{msg.date}</span>
      </div>

      <h4 className="msg-role">{msg.role}</h4>
      <p className="msg-preview">{msg.preview}</p>

      {msg.unread && !isActive && (
        <div className="unread-dot"></div>
      )}
    </div>
  );
};

export default MsgCard;
