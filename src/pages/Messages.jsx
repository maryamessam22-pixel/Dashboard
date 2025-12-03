import React, { useState } from "react";
import { Mail, MessageSquare, Search, Bell, ChevronDown } from "lucide-react";
import "./Messages.css";
import MsgCard from '../components/MsgCard';

import Layout from "../layout/Layout";
import SearchImg from "../assets/search.png";
import BellImg from "../assets/bell.png";

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
      <div className="messages-page-wrapper" style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        {showSidebar && <Layout />}

        {/* Messages Content */}
        <div className="messages-container" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          
         
         <header className="top-header">
                   <div className="breadcrumbs">
                     Pages / <strong>Dashboard</strong>
                   </div>
         
                   <div className="header-actions">
                     <div className="search-bar">
                       <img src={SearchImg} alt="search icon" style={{ width: "16px", height: "16px" }} />
                       <input type="text" placeholder="Search" />
                     </div>
         
                     <div className="notification-icon">
                       <img src={BellImg} alt="bell icon" style={{ width: "20px", height: "20px" }} />
                       <div className="dot"></div>
                     </div>
                   </div>
                 </header>

       
          <div className="messages-content" style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            
            {/* Left Messages List */}
            <div className="messages-sidebar" style={{ width: "350px", borderRight: "1px solid #342f5c", overflowY: "auto", padding: "1rem" }}>
              <div className="messages-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h2>Inbox</h2>
                <span className="message-count">{messagesData.length} messages</span>
              </div>
              <div className="messages-list" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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

            {/* Right Message Detail */}
            <div className="message-detail" style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
              {selectedMessage ? (
                <div className="detail-container">
                  <div className="detail-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                    <div className="sender-info" style={{ display: "flex", gap: "1rem" }}>
                      <div className="avatar">{selectedMessage.sender.charAt(0)}</div>
                      <div>
                        <h2>{selectedMessage.sender}</h2>
                        <div className="email-time" style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                          <span className="email">{selectedMessage.email}</span> • <span>{selectedMessage.date}, {selectedMessage.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="detail-content" style={{ marginBottom: "1rem" }}>
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
                <div className="empty-state" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.6 }}>
                  <div className="empty-icon" style={{ marginBottom: "1rem" }}>
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



