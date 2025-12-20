import React, { useEffect, useState } from 'react';
import ProjectRow from "./ProjectRow"; // Same directory
import "./Projects.css";
import Layout from "../../layouts/Layout"; // Updated path
import Header from "../../layouts/Header"; // Updated path
import { Link } from "react-router-dom";
import { supabase } from '../../config/Supabase'; // Updated path

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [Projects, setProjects] = useState([]);

  useEffect(() => {
    async function getAllProjectsAPI() {
      const res = await supabase.from("Projects").select("*");
      // Added || [] safety check from your old file to prevent errors if data is null
      setProjects(res.data || []);
      setLoading(false);
    }
    getAllProjectsAPI();
  }, []);

  if (loading) {
    return (
      <div className="loading-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="app-container">
        <div className="table-card">
          <Header title="Pages/ Projects" />

          {/* Add New Project Button */}
          <div className="add-new-container">
            <Link to="/add-new-project">
              <button className="add-new-btn">+ Add New Project</button>
            </Link>
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
            {Projects.map((project) => {
              // We are inside a code block {}, so we must explicitly RETURN the JSX
              return (
                <ProjectRow
                  key={project.id}
                  img={project.cover_image}
                  title={project.project_name_EN}
                  date={project.start_Date}
                  category={project.category_outside}
                  status={project.status}
                  views={project.views}
                  published={project.puplished_date}
                  {...project}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;