// src/pages/Projects.jsx
import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import ProjectRow from "../components/ProjectRow";
import "./Projects.css"; 
import Layout from "../layout/Layout";
import Header from "../components/Header";

// Import your images
import gImg from "../assets/g.png"; 
import horrorImg from "../assets/horrorr.png"; 
import tImg from "../assets/t.png";
import goImg from "../assets/go.png";
import miniImg from "../assets/miniii.png"; 
import eventImg from "../assets/eventt.png"; 
// Note: You might need to add/import images for Giza Zoo and TV OS if you have them specific files. 
// I reused existing images as placeholders for the new items.

// Updated Data matching the design image
const projectsData = [
  {
    id: 1,
    img: gImg, // Replace with Giza Zoo image if available
    title: "Giza zoo website",
    date: "January 1",
    category: "UI/UX Design",
    status: "Published",
    views: "14.6k",
    published: "Oct 20, 2024"
  },
  {
    id: 2,
    img: horrorImg, 
    title: "Horror Website",
    date: "March 13",
    category: "UI/UX Design",
    status: "Draft",
    views: "24.7k",
    published: "Oct 10, 2024"
  },
  {
    id: 3,
    img: tImg, 
    title: "TV Operating System",
    date: "January 1",
    category: "UI/UX Design",
    status: "Published",
    views: "21.6k",
    published: "Oct 23, 2024"
  },
  {
    id: 4,
    img: goImg, 
    title: "Go Ride App",
    date: "January 1",
    category: "UI/UX Design",
    status: "Published",
    views: "21.6k",
    published: "Oct 23, 2024"
  },
  {
    id: 5,
    img: miniImg, 
    title: "Mini Cooper car screens",
    date: "August 12",
    category: "UI/UX Design",
    status: "Published",
    views: "28k",
    published: "Oct 23, 2024"
  },
  {
    id: 6,
    img: eventImg, 
    title: "Event Planner",
    date: "January 1",
    category: "UI/UX Design",
    status: "Published",
    views: "61.6k",
    published: "Oct 23, 2024"
  }
];

const Projects = () => {
  const navigate = useNavigate(); 

  const handleAddNew = () => {
    navigate("/add-new-project"); 
  };

  return (
    <div className="app-container">
      <div className="table-card">
        <Header title="Pages/ Projects" />

        {/* Add New Project Button */}
        <div className="add-new-container">
          <button className="add-new-btn" onClick={handleAddNew}>
            <Plus size={16} style={{ marginRight: "8px" }} />
            Add New Project
          </button>
        </div>

        <Layout />

        {/* Table Header */}
        <div className="table-header">
          <div className="header-cell pl-4">Project Name</div>
          <div className="header-cell">Category</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Views</div>
          <div className="header-cell">Date</div>
          <div className="header-cell center">Actions</div>
        </div>

        {/* Table Rows */}
        <div className="table-body">
          {projectsData.map((project) => (
            <ProjectRow 
              key={project.id}
              {...project}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;


