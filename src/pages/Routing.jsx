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
import AddSkillsExp from './AddSkillsExp'; // <--- 1. Import the new page here

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
                    
                    {/* Skills & Experience Main Page */}
                    <Route path="/skills-exp" element={<SkillsExp />} />

                    {/* New Route for Adding Skills/Experience */}
                    <Route path="/skills-exp/add" element={<AddSkillsExp />} /> 

                    <Route path="/site-content" element={<SiteContentPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Routing;