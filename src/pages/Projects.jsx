import React from "react";
import { Edit2, Trash2, Plus, Search, Bell } from "lucide-react";
import ProjectRow from "../components/ProjectRow";
import "./Projects.css"; 
import Layout from "../layout/Layout";
import Header from "../components/Header";

import horrorImg from "../assets/horrorr.png"; 
import miniImg from "../assets/miniii.png"; 
import eventImg from "../assets/eventt.png"; 

// Mock Data
const projectsData = [
  {
    id: 1,
    img: horrorImg, 
    title: "Horror Website",
    date: "March 13",
    category: "Web Design",
    status: "Published",
    views: "14.6k",
    published: "Oct 20, 2024"
  },
  {
    id: 2,
    img: miniImg, 
    title: "Mini Cooper car screens",
    date: "August 12",
    category: "UI/UX Design",
    status: "Draft",
    views: "24.7k",
    published: "Oct 10, 2024"
  },
  {
    id: 3,
    img: eventImg, 
    title: "Event Planner",
    date: "January 1",
    category: "Mobile App",
    status: "Published",
    views: "21.6k",
    published: "Oct 23, 2024"
  }
];

const Projects = () => {
  return (
    <div className="app-container">
      <div className="table-card">
        <Header title="Pages/ Projects" />

        {/* Add New Project Button */}
        <div className="add-new-container">
          <button className="add-new-btn">
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

