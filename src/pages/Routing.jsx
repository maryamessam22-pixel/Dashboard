import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Messages from './Messages';
import Profile from './Profile';
import LoginPage from './LoginPage';
import Projects from './Projects';
import EditorPage from './EditorPage';
import AddNewProject from './AddNewProject';
import Blogs from './Blogs';
import SiteContentPage from './SiteContentPage';
import SkillsExp from './SkillsExp';
import AddExperience from './AddExperience';
import AddSkill from './AddSkill';
import Categories from './Categories';
import AddNewBlog from './AddNewBlog';
import EditBlog from './EditBlog';

const Routing = () => {
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
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Routing;
                    
                   

