import React, { useState } from "react";
import { Mail, MessageSquare } from "lucide-react";
import "./Messages.css";
import MsgCard from '../components/MsgCard';
import Layout from "../layout/Layout";
import Header from "../components/Header";
// import Title from './../components/Title';

//Data
const messagesData = [
  {
    id: 1,
    sender: "Leila Essam",
    role: "Project Inquiry",
    date: "Oct 24",
    preview: "Hi, I saw your portfolio and would like to discuss a freelance opportunity...",
    fullContent: "Hi, I saw your portfolio and would like to discuss a freelance opportunity for our fintech app. We really love your style and think it would fit our new brand direction perfectly. Let me know when you're available to chat!",
    email: "Leilaessam@design.com",
    time: "10:00AM",
    unread: true,
  },
  {
    id: 2,
    sender: "Zeina Essam",
    role: "Collaboration",
    date: "Oct 24",
    preview: "Would you be interested in redesigning our firm website? We need...",
    fullContent: "Would you be interested in redesigning our firm website? We need a modern look that matches our new architectural projects. We are looking for a clean, minimalist aesthetic.",
    email: "zeina@corp.com",
    time: "11:30AM",
    unread: false,
  },
  {
    id: 3,
    sender: "Belal",
    role: "Job Offer",
    date: "Oct 24",
    preview: "We are hiring a Senior Product Designer and think your profile matches...",
    fullContent: "We are hiring a Senior Product Designer and think your profile matches perfectly with what we are looking for. We offer competitive salary and full remote options.",
    email: "belal@recruitment.com",
    time: "02:15PM",
    unread: false,
  },
];

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <div className="messages-page-wrapper">
        
    {showSidebar && <Layout />}

        {/* Messages Content */}
        <div className="messages-container">
          
 
           <Header title="Pages/ Messages" />
          <div className="messages-content">
            {/* Left msg*/}
            <div className="messages-sidebar">
              <div className="messages-header">
                <h2>Inbox</h2>
                <span className="message-count">{messagesData.length} messages</span>
              </div>
              <div className="messages-list">
                {messagesData.map((msg) => (
                  <MsgCard
                    key={msg.id}
                    msg={msg}
                    isActive={selectedMessage?.id === msg.id}
                    onClick={() => setSelectedMessage(msg)}
                  />
                ))}
              </div>
            </div>

            {/* Right dtailes msg */}
            <div className="message-detail">
              {selectedMessage ? (
                <div className="detail-container">
                  <div className="detail-header">
                    <div className="sender-info">
                      <div className="avatar">{selectedMessage.sender.charAt(0)}</div>
                      <div>
                        <h2>{selectedMessage.sender}</h2>
                        <div className="email-time">
                          <span className="email">{selectedMessage.email}</span> • <span>{selectedMessage.date}, {selectedMessage.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="detail-content">
                    <h3>{selectedMessage.role}</h3>
                    <p>{selectedMessage.fullContent}</p>
                  </div>

                  <div className="detail-reply">
                    <button className="reply-btn">
                      <Mail size={16} /> Reply to {selectedMessage.sender.split(" ")[0]}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <MessageSquare size={48} />
                  </div>
                  <h3>Select a message to read</h3>
                  <p>Click on any message from the list on the left to view full details here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;



