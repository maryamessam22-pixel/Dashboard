import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/dashboard/Home';
import Messages from './pages/dashboard/Messages';
import Profile from './pages/dashboard/Profile';
import LoginPage from './pages/auth/LoginPage';
import Projects from './pages/projects/Projects';
import EditorPage from './pages/projects/EditorPage';
import AddNewProject from './pages/projects/AddNewProject';
import Blogs from './pages/blogs/Blogs';
import SiteContentPage from './pages/dashboard/SiteContentPage';
import SkillsExp from './pages/skills/SkillsExp';
import AddExperience from './pages/experience/AddExperience';
import AddSkill from './pages/skills/AddSkill';
import Categories from './pages/blogs/Categories';
import AddNewBlog from './pages/blogs/AddNewBlog';
import EditBlog from './pages/blogs/EditBlog';
import ProjectsAPI from './pages/projects/ProjectsApi';

const App = () => {
    return (
        <>
        
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="/edit/:id" element={<EditorPage />} />
                    <Route path="/add-new-project" element={<AddNewProject />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/add-new-blog" element={<AddNewBlog />} />
                    <Route path="/edit-blog/:id" element={<EditBlog />} />
                    <Route path="/skills-exp" element={<SkillsExp />} />
                    <Route path="/add-skill" element={<AddSkill />} />
                    <Route path="/add-experience" element={<AddExperience />} />
                    <Route path="/site-content" element={<SiteContentPage />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/projects-api" element={<ProjectsAPI />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
                    
                   
