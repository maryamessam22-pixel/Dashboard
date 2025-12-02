import React, { useState } from "react";
import { Mail, MessageSquare, Search, Bell, ChevronDown } from "lucide-react";
import "./Messages.css";
import MsgCard from '../components/MsgCard';

import Layout from "../layout/Layout";

// Mock Data
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
          
          {/* Header */}
          <header className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem" }}>
            <div className="header-left" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* <button className="menu-toggle" onClick={() => setShowSidebar(!showSidebar)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12H21M3 6H21M9 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button> */}
              <h1>Messages</h1>
            </div>
            <div className="header-right" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className="search-bar" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Search size={18} />
                <input type="text" placeholder="Search" />
              </div>
              <button className="notification-btn">
                <Bell size={20} />
                <span className="notification-dot"></span>
              </button>
              <div className="user-profile" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div className="avatar"><span>M</span></div>
                <ChevronDown size={18} />
              </div>
            </div>
          </header>

          {/* Messages Grid */}
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



