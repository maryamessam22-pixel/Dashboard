import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditorPage.css";

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [projectEN, setProjectEN] = useState({
    title: "",
    type: "",
    startDate: "",
    endDate: "",
    description: "",
    tools: ["Figma", "VS Code"], // Pre-selected for demo
    slug: "",
    metaTitle: "",
    metaDescription: "",
    imageAlt: "",
  });
  const [projectAR, setProjectAR] = useState({
    title: "",
    type: "",
    description: "",
  });

  const toolsList = [
    "Figma", "VS Code", "3D Max", "Illustrator", "Lightroom",
    "Photoshop", "Adobe Aero", "Blender", "After Effects", "Adobe Premier"
  ];

  const handleToolToggle = (tool) => {
    setProjectEN((prev) => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter((t) => t !== tool)
        : [...prev.tools, tool],
    }));
  };

  return (
    <div className="editor-page-wrapper">
      <div className="editor-container">
        
        {/* Header */}
        <div className="editor-header">
          <div className="breadcrumb">Pages / <strong>Edit</strong></div>
          <button className="close-btn" onClick={() => navigate("/projects")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Top Section: Image + Info Grid */}
        <div className="top-layout">
          {/* Image Upload Box */}
          <div className="image-upload-section">
            <div className="upload-box">
              <div className="upload-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </div>
              <span>Upload Image</span>
            </div>
          </div>

          {/* Project Info Fields */}
          <div className="project-info-grid">
            <div className="input-group">
              <label>Project Title (EN)</label>
              <input
                type="text"
                value={projectEN.title}
                onChange={(e) => setProjectEN({ ...projectEN, title: e.target.value })}
              />
            </div>
            <div className="input-group right-align-label">
              <label>اسم المشروع (AR)</label>
              <input
                type="text"
                className="rtl-input"
                value={projectAR.title}
                onChange={(e) => setProjectAR({ ...projectAR, title: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Project Type (EN)</label>
              <input
                type="text"
                value={projectEN.type}
                onChange={(e) => setProjectEN({ ...projectEN, type: e.target.value })}
              />
            </div>
            <div className="input-group right-align-label">
              <label>نوع المشروع (AR)</label>
              <input
                type="text"
                className="rtl-input"
                value={projectAR.type}
                onChange={(e) => setProjectAR({ ...projectAR, type: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Start date</label>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={projectEN.startDate}
                  onChange={(e) => setProjectEN({ ...projectEN, startDate: e.target.value })}
                />
              </div>
            </div>
            <div className="input-group">
              <label>End date</label>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={projectEN.endDate}
                  onChange={(e) => setProjectEN({ ...projectEN, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="description-section">
          <div className="editor-group">
            <label>Project Description (EN)</label>
            <div className="quill-wrapper">
               <ReactQuill
                theme="snow"
                value={projectEN.description}
                onChange={(content) => setProjectEN({ ...projectEN, description: content })}
                modules={{ toolbar: [['bold', 'italic', 'underline', 'strike'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'image', 'code-block']] }}
              />
            </div>
          </div>
          
          <div className="editor-group">
            <label className="right-align-label">الوصف الوظيفي للمشروع (AR)</label>
            <div className="quill-wrapper">
              <ReactQuill
                theme="snow"
                value={projectAR.description}
                onChange={(content) => setProjectAR({ ...projectAR, description: content })}
                modules={{ toolbar: [['bold', 'italic', 'underline', 'strike'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'image', 'code-block']] }}
              />
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="tools-section">
          <label>Select Tools Used</label>
          <div className="tools-list">
            {toolsList.map((tool) => (
              <button
                key={tool}
                className={projectEN.tools.includes(tool) ? "tool active" : "tool"}
                onClick={() => handleToolToggle(tool)}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* SEO Section */}
        <div className="seo-section">
          <div className="seo-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <h3>Project SEO</h3>
            <span className="badge">Global Requirement</span>
          </div>
          <div className="seo-divider"></div>

          <div className="input-group">
            <label className="seo-label">Slug/URL</label>
            <div className="slug-input-wrapper">
              <span className="slug-prefix">mariamarif.com/</span>
              <input
                type="text"
                placeholder="Project-slug"
                value={projectEN.slug}
                onChange={(e) => setProjectEN({ ...projectEN, slug: e.target.value })}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="seo-label">Meta Title (Page Title)</label>
            <input
              className="seo-input"
              type="text"
              placeholder="SEO Title displayed in Google Search"
              value={projectEN.metaTitle}
              onChange={(e) => setProjectEN({ ...projectEN, metaTitle: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label className="seo-label">Meta Description</label>
            <textarea
              className="seo-textarea"
              placeholder="Brief summary for search engines..."
              value={projectEN.metaDescription}
              onChange={(e) => setProjectEN({ ...projectEN, metaDescription: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label className="seo-label">Featured Image Alt Text</label>
            <input
               className="seo-input"
              type="text"
              placeholder="Describe the image for accessibility and SEO"
              value={projectEN.imageAlt}
              onChange={(e) => setProjectEN({ ...projectEN, imageAlt: e.target.value })}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="footer-actions">
          <button className="btn-save">Save Draft</button>
          <button className="btn-publish">Publish Project</button>
        </div>

      </div>
    </div>
  );
};

export default EditorPage;