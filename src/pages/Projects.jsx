import React from "react";
import { Edit2, Trash2, Plus, Search, Bell } from "lucide-react";
import ProjectRow from "../components/ProjectRow";
import "./Projects.css"; 
import Layout from "../layout/Layout";
import Header from "../components/Header";

// Mock Data
const projectsData = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=100&h=100", 
    title: "Horror Website",
    date: "March 13",
    category: "Web Design",
    status: "Published",
    views: "14.6k",
    published: "Oct 20, 2024"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=100&h=100", 
    title: "Mini Cooper car screens",
    date: "August 12",
    category: "UI/UX Design",
    status: "Draft",
    views: "24.7k",
    published: "Oct 10, 2024"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=100&h=100", 
    title: "Event Planner",
    date: "January 1",
    category: "Mobile App",
    status: "Published",
    views: "21.6k",
    published: "Oct 23, 2024"
  }
];

const Projects = () => {
  return (<>


    <div className="app-container">
      <div className="table-card">
   <Header title="Pages/ Projects" />
        
        {/* Table Header */}
    <Layout/>
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
    </>
  );
};

export default Projects;
