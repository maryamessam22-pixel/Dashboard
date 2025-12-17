import React, {useEffect, useState} from 'react';
// import { Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom"; 
import ProjectRow from "../components/ProjectRow";
import "./Projects.css"; 
import Layout from "../layout/Layout";
import Header from "../components/Header";

import { Link } from "react-router-dom";
// import gImg from "../assets/g.png"; 
// import horrorImg from "../assets/horrorr.png"; 
// import tImg from "../assets/t.png";
// import goImg from "../assets/go.png";
// import miniImg from "../assets/miniii.png"; 
// import eventImg from "../assets/eventt.png"; 
import { supabase} from '../Supabase';
 



// const projectsData = []





const Projects = () => {

 const [loading, setLoading] = useState(true)
 const [Projects, setProjects] = useState("")

useEffect (()=>{
  
  
  async function getAllProjectsAPI(){
    const res = await supabase.from("Projects").select("*")
    setProjects(res.data);
    // console.log(res);
    setLoading(false);
}

     getAllProjectsAPI()


},[]);


if (loading) return <p>Loading...</p>;





  // const navigate = useNavigate(); 

  // const handleAddNew = () => {
  //   navigate("/add-new-project"); 
  // };

  return (<>


    <div className="app-container">
      <div className="table-card">
        <Header title="Pages/ Projects" />

        {/* Add New Project Button */}
        <div className="add-new-container">
    <Link to="/add-new-project">
  <button className="add-new-btn">+ Add New Project</button>
</Link>

{/*     
            <Plus size={16} style={{ marginRight: "8px" }} />
            Add New Project */}
      
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

          {
 

}
          {Projects.map((project) => (

            <ProjectRow   img={project.cover_image}  title={project.project_name_EN} date={project.start_Date} category={project.category_outside}  status={project.status}

                views={project.views}  published={project.puplished_date}

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


