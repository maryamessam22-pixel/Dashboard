import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import BlogsRow from "../components/BlogsRow";  
import "./Blogs.css"; 
import Layout from "../layout/Layout";
import Header from "../components/Header";

import horrorImg from "../assets/horrorr.png"; 
import miniImg from "../assets/miniii.png"; 
import eventImg from "../assets/eventt.png"; 

// Data
const blogsData = [
  {
    id: 1,
    img: horrorImg,
    title: "Blog: Horror Website",
    date: "March 13",
    category: "Web Design",
    status: "Published",
    views: "14.6k",
    published: "Oct 20, 2024"
  },
  {
    id: 2,
    img: miniImg,
    title: "Blog: Mini Cooper",
    date: "August 12",
    category: "UI/UX Design",
    status: "Draft",
    views: "24.7k",
    published: "Oct 10, 2024"
  },
  {
    id: 3,
    img: eventImg,
    title: "Blog: Event Planner",
    date: "January 1",
    category: "Mobile App",
    status: "Published",
    views: "21.6k",
    published: "Oct 23, 2024"
  }
];

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="table-card">
        <Header title="Pages / Blogs" />

        <div className="add-new-container">
          <button className="add-new-btn" onClick={() => navigate("/add-new-blog")}>
            <Plus size={16} style={{ marginRight: "8px" }} />
            Add New Blog
          </button>
        </div>

        <Layout />

        <div className="table-header">
          <div className="header-cell pl-4">Blog Title</div>
          <div className="header-cell">Category</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Views</div>
          <div className="header-cell">Date</div>
          <div className="header-cell center">Actions</div>
        </div>

        <div className="table-body">
          {blogsData.map((blog) => (
            <BlogsRow key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
