import React, { useEffect, useState } from "react";
import "./Messages.css";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import MsgCard from "../../components/common/MsgCard";
import { supabase } from "../../config/Supabase";
const Messages = () => {
  const [loading, setLoading] = useState(true);
  const [Messages, setMessages] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    async function getAllMessagesAPI() {
      const res = await supabase.from("contact_messages").select("*");
      setMessages(res.data);
      // console.log(res);
      setLoading(false);
    }

    getAllMessagesAPI();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const { error } = await supabase
          .from("contact_messages")
          .delete()
          .eq("id", id);

        if (error) throw error;

        setMessages(Messages.filter(msg => msg.id !== id));
        setSelectedMessage(null);
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message");
      }
    }
  };

  // if (loading) return <p>Loading...</p>;
  if (loading) {
    return (
      <div className="loading-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="messages-page-wrapper">
      <Layout />

      <div className="messages-container">
        <Header title="Pages / Messages" />

        <div className="messages-content">

          <div className="messages-sidebar">
            <div className="messages-header">
              <h2>Inbox</h2>
              <span className="message-count">{Messages.length} messages</span>
            </div>

            <div className="messages-list">
              {Messages.map((msg) => (
                <MsgCard
                  key={msg.id}
                  msg={msg.message}
                  sender={msg.name}
                  email={msg.email}
                  date={msg.date}



                  isActive={selectedMessage?.id === msg.id}
                  onClick={() => setSelectedMessage(msg)}
                />
              ))}
            </div>
          </div>


          <div className="message-detail">
            {selectedMessage ? (
              <div className="detail-container">
                <div className="detail-header">
                  <div className="sender-info">
                    <div className="avatar">{selectedMessage.sender?.charAt(0) || selectedMessage.name?.charAt(0)}</div>
                    <div>
                      <h2>{selectedMessage.sender || selectedMessage.name}</h2>
                      <div className="email-time">
                        <span className="email">{selectedMessage.email}</span> •{" "}
                        <span>{new Date(selectedMessage.created_at || selectedMessage.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-content">
                  <h3>{selectedMessage.role || "Message"}</h3>
                  <p>{selectedMessage.message}</p>
                </div>

                <div className="message-actions" style={{ marginTop: 'auto', paddingTop: '20px' }}>
                  <a href={`mailto:${selectedMessage.email}`} className="reply-msg-btn">
                    Reply
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="delete-msg-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📨</div>
                <h3>Select a message to read</h3>
                <p>Click on any message from the list on the left to view full details here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
