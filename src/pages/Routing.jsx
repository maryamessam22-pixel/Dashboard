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

const Routing = () => {
    return ( <>
    



 <BrowserRouter>
 <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="projects" element={<Projects/>} />
          <Route path="/edit/:id" element={<EditorPage/>} />
          <Route path="/add-new-project" element={<AddNewProject/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/skills-exp" element={<SkillsExp/>} />
          <Route path="/site-content" element={<SiteContentPage/>} />

          {/* <Route path="*" element={<Errorpage />} /> */}
  </Routes>
 </BrowserRouter>


    </> );
}
 
export default Routing;