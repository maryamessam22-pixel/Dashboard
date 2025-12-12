import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
// ✅ CORRECT IMPORT: Importing BlogsRow instead of ProjectRow
import BlogsRow from "../components/BlogsRow"; 
import "./Blogs.css"; 
import Layout from "../layout/Layout";
import Header from "../components/Header";

// Import your images
import blog1Img from "../assets/blog1.png"; 
import blog2Img from "../assets/blog2.png"; 

// Data
const blogsData = [
  {
    id: 1,
    img: blog1Img, 
    title: "UI/UX Designer Do?",
    date: "March 13",
    category: "About UI/UX",
    status: "Draft",
    views: "1.6k",
    published: "Sep 20, 2024"
  },
  {
    id: 2,
    img: blog2Img, 
    title: "My creative friends",
    date: "August 12",
    category: "Creativity",
    status: "Published",
    views: "4.9k",
    published: "Aug 10, 2024"
  }
];

const Blogs = () => {
  const navigate = useNavigate(); 

  const handleAddNew = () => {
    navigate("/add-new-blog"); 
  };

  return (
    <div className="app-container">
      <div className="table-card">
        <Header title="Pages/ Blogs" />

        {/* Add New Blog Button */}
        <div className="add-new-container">
          <button className="add-new-btn" onClick={handleAddNew}>
            <Plus size={16} style={{ marginRight: "8px" }} />
            Add New Blog
          </button>
        </div>

        <Layout />

        {/* Table Header */}
        <div className="table-header">
          <div className="header-cell pl-4">Blog Name</div>
          <div className="header-cell">Category</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Views</div>
          <div className="header-cell">Date</div>
          <div className="header-cell center">Actions</div>
        </div>

        {/* Table Rows */}
        <div className="table-body">
          {blogsData.map((blog) => (
            // ✅ CORRECT USAGE: Using BlogsRow component
            <BlogsRow 
              key={blog.id}
              {...blog}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;