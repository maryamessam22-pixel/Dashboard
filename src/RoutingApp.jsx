import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/dashboard/Home';
import Messages from './pages/dashboard/Messages';
import Profile from './pages/dashboard/Profile';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Projects from './pages/projects/Projects';
import ProjectsPageSettings from './pages/projects/ProjectsPageSettings';
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
import ProtectedRoute from './components/auth/ProtectedRoute';
import { isSupabaseConfigured } from './config/Supabase';

const App = () => {
    if (!isSupabaseConfigured) {
        return (
            <main style={{ maxWidth: 640, margin: '12vh auto', padding: 24, fontFamily: 'Arial, sans-serif', color: '#1a103c' }}>
                <h1>Supabase setup required</h1>
                <p>The app cannot connect until its Supabase environment variables are set.</p>
                <p>Create <code>dashboard/.env.local</code> with <code>REACT_APP_SUPABASE_URL</code> and <code>REACT_APP_SUPABASE_ANON_KEY</code>, then restart the development server.</p>
                <p>For Vercel, add both variables in Project Settings → Environment Variables and redeploy.</p>
            </main>
        );
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects-page" element={<ProjectsPageSettings />} />
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
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
                    
                   
