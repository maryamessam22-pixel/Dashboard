import React, { useEffect, useState } from 'react';
import ProjectRow from "./ProjectRow";
import "./Projects.css";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import { Link } from "react-router-dom";
import { supabase } from '../../config/Supabase';

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    async function getProjects() {
      setLoading(true);
      const res = await supabase
        .from("Projects")
        .select("*")
        .order('id', { ascending: false });

      if (res.data) {
        setProjectsList(res.data);
      } else {
        console.error(res.error);
      }
      setLoading(false);
    }
    getProjects();
  }, []);

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('Projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjectsList(prev => prev.filter(p => p.id !== id));
      alert("Project deleted successfully.");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project.");
    }
  };

  if (loading) {
    return (
      <div className="loading-center">
        <p>Loading Projects...</p>
      </div>
    );
  }

  return (
    <>
      <div className="app-container">
        <div className="table-card">
          <Header title="Pages/ Projects" />

          <div className="add-new-container">
            <Link to="/add-new-project">
              <button className="add-new-btn">+ Add New Project</button>
            </Link>
          </div>

          <Layout />

     
          <div className="table-header">
            <div className="header-cell pl-4">Project Name</div>
            <div className="header-cell">Category</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Views</div>
            <div className="header-cell">Date</div>
            <div className="header-cell center">Actions</div>
          </div>


          <div className="table-body">
            {projectsList.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No projects found.</div>
            ) : (
              projectsList.map((project) => (
                <ProjectRow
                  key={project.id}
                  id={project.id}
                  img={project.cover_image}
                  title={project.project_name_EN}
                  date={project.start_Date}
                  category={project.category_outside}
                  status={project.status}
                  views={project.views}
                  published={project.puplished_date}
                  onDelete={deleteProject}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;