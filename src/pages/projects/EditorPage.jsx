import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditorPage.css";
import { supabase } from "../../config/Supabase";

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [project, setProject] = useState({
    title: "",
    slug: "",
    type: "",
    category: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    subtitle: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
    coverImage: "",
    images: [],
    processSteps: [],
    tools: [],
    imageAlt: ""
  });


  const toolsList = [
    "Figma", "VS Code", "3D Max", "Illustrator", "Lightroom",
    "Photoshop", "Adobe Aero", "Blender", "After Effects", "Adobe Premier", "React", "Supabase"
  ];

  useEffect(() => {
    async function callRow() {
      if (!id) return;
      setLoading(true);

      const res = await supabase
        .from('Projects')
        .select('*')
        .eq('id', id);

      if (res.data && res.data[0]) {
        const data = res.data[0];
        setProject({
          title: data.project_name_EN || "",
          slug: data.slug || "",
          type: data.projectType || "",
          category: data.category_outside || "",
          role: data.Role || "",
          startDate: data.start_Date || "",
          endDate: data.end_Date || "",
          description: data.description_EN || "",
          subtitle: data.subtitle_out || "",
          metaDescription: data.meta_dscription || "",
          status: data.status || "draft",
          coverImage: data.cover_image || "",
          images: data.images || [],
          processSteps: data.processSteps || [],
          tools: data.tools || [],
          metaTitle: data.meta_title || "",
          imageAlt: ""
        });
      } else {
        console.error("Project not found or error:", res.error);
      }
      setLoading(false);
    }
    callRow();
  }, [id]);

  const handleChange = (field, value) => {
    setProject(prev => ({ ...prev, [field]: value }));
  };

  const handleToolToggle = (tool) => {
    setProject((prev) => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter((t) => t !== tool)
        : [...prev.tools, tool],
    }));
  };

  const addProcessStep = () => {
    setProject(prev => ({ ...prev, processSteps: [...prev.processSteps, ""] }));
  };
  const updateProcessStep = (index, val) => {
    const newSteps = [...project.processSteps];
    newSteps[index] = val;
    setProject(prev => ({ ...prev, processSteps: newSteps }));
  };
  const removeProcessStep = (index) => {
    setProject(prev => ({ ...prev, processSteps: prev.processSteps.filter((_, i) => i !== index) }));
  };

  const removeImage = (index) => {
    setProject(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      setProject(prev => ({ ...prev, coverImage: data.publicUrl }));
    } catch (error) {
      console.error('Error uploading cover:', error);
      alert('Error uploading cover image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const newUrls = [];
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
        newUrls.push(data.publicUrl);
      }
      setProject(prev => ({ ...prev, images: [...prev.images, ...newUrls] }));
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      alert('Error uploading images: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (publishStatus) => {
    setSaving(true);
    try {
      const finalStatus = publishStatus || project.status;
      const updates = {
        project_name_EN: project.title,
        slug: project.slug,
        projectType: project.type,
        category_outside: project.category,
        Role: project.role,
        start_Date: project.startDate || null,
        end_Date: project.endDate || null,
        description_EN: project.description,
        subtitle_out: project.subtitle,
        meta_dscription: project.metaDescription,
        meta_title: project.metaTitle,
        status: finalStatus,
        cover_image: project.coverImage,
        images: project.images,
        processSteps: project.processSteps,
        tools: project.tools
      };

      const { error } = await supabase
        .from('Projects')
        .update(updates)
        .eq('id', id);



      let updateQuery = supabase.from('Projects').update(updates);

      updateQuery = updateQuery.eq('id', id);

      const res = await updateQuery;

      if (res.error) throw res.error;

      alert("Project updated successfully!");
      navigate("/projects");
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Error updating project. Check console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="editor-page-wrapper loading-text">Loading Project...</div>;
  }

  return (
    <div className="editor-page-wrapper">
      <div className="editor-container">

        <div className="editor-header">
          <div className="breadcrumb">Pages / <strong>Edit Project</strong></div>
          <button className="close-btn" onClick={() => navigate("/projects")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="top-layout">


          <div className="left-column">
            <div className="section-card">
              <h3 className="section-card-title">Cover Image</h3>

              <div
                className={`upload-box-custom ${project.coverImage ? 'has-image' : ''}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden-input"
                />

                {uploading ? (
                  <span className="uploading-text">Uploading...</span>
                ) : project.coverImage ? (
                  <div className="preview-container">
                    <img src={project.coverImage} alt="Cover" className="cover-preview-img" />
                    <div className="preview-overlay-text">Click or Drag to replace</div>
                  </div>
                ) : (
                  <div className="empty-upload-state">
                    <div className="upload-icon-large">🖼️</div>
                    <p className="upload-instruction-text">Drag & drop or click to upload</p>
                  </div>
                )}
              </div>
            </div>

            <div className="section-card mt-20">
              <h3 className="section-card-title">Gallery Images</h3>

              {/* Existing Images Grid */}
              <div className="gallery-grid">
                {project.images.map((img, i) => (
                  <div key={i} className="gallery-item">
                    <img src={img} alt={`Gallery ${i}`} className="gallery-img" />
                    <button
                      onClick={() => removeImage(i)}
                      className="remove-img-btn"
                    >×</button>
                  </div>
                ))}
              </div>

              {/* Upload New Grid Item */}
              <div
                className="gallery-add-btn"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden-input"
                />
                {uploading ? (
                  <span className="uploading-text">Uploading...</span>
                ) : (
                  <div className="gallery-add-placeholder">
                    <span>+ Add Images</span>
                  </div>
                )}
              </div>
            </div>
          </div>


          <div className="right-column">
            <div className="project-info-grid">
              <div className="input-group">
                <label>Project Title (EN)</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Slug (URL)</label>
                <input
                  type="text"
                  value={project.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Category (Outside)</label>
                <input
                  type="text"
                  placeholder="e.g. UI/UX, Branding..."
                  value={project.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Project Type</label>
                <input
                  type="text"
                  placeholder="e.g. Mobile App, Website..."
                  value={project.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>My Role</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Designer"
                  value={project.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Status</label>
                <select
                  value={project.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="status-select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="input-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={project.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={project.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="description-section mt-30">
              <div className="editor-group">
                <label>Project Overview / Description</label>
                <div className="quill-wrapper">
                  <ReactQuill
                    theme="snow"
                    value={project.description}
                    onChange={(content) => handleChange('description', content)}
                    modules={{ toolbar: [['bold', 'italic', 'underline', 'strike'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['link', 'image', 'code-block']] }}
                  />
                </div>
              </div>

              <div className="editor-group mt-20">
                <label>Subtitle / Card Description</label>
                <textarea
                  className="seo-textarea"
                  value={project.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  rows={3}
                />
              </div>
            </div>


            <div className="tools-section">
              <label>Tools Used</label>
              <div className="tools-list">
                {toolsList.map((tool) => (
                  <button
                    key={tool}
                    className={project.tools.includes(tool) ? "tool active" : "tool"}
                    onClick={() => handleToolToggle(tool)}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>


            <div className="seo-section mb-30">
              <div className="seo-header"><h3>Process Steps (Design Process)</h3></div>
              <div className="seo-divider"></div>
              <div className="dynamic-list">
                {project.processSteps.map((step, i) => (
                  <div key={i} className="list-item-row process-step-row">
                    <div className="step-number">{i + 1}</div>
                    <input
                      type="text"
                      className="seo-input"
                      value={step}
                      onChange={(e) => updateProcessStep(i, e.target.value)}
                      placeholder={`Step ${i + 1}`}
                    />
                    <button className="btn-remove btn-remove-step" onClick={() => removeProcessStep(i)}>×</button>
                  </div>
                ))}
                <button className="btn-publish btn-add-step" onClick={addProcessStep}>+ Add Step</button>
              </div>
            </div>


            <div className="seo-section">
              <div className="seo-header"><h3>SEO Meta</h3></div>
              <div className="seo-divider"></div>
              <div className="input-group">
                <label>Slug (URL)</label>
                <input
                  type="text"
                  value={project.slug}
                  placeholder="e.g. my-project-slug"
                  onChange={(e) => handleChange('slug', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Meta Title</label>
                <input
                  type="text"
                  value={project.metaTitle}
                  onChange={(e) => handleChange('metaTitle', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Meta Description</label>
                <textarea
                  className="seo-textarea"
                  value={project.metaDescription}
                  onChange={(e) => handleChange('metaDescription', e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>

        <div className="footer-actions">
          <button className="btn-save" onClick={() => handleSave()} disabled={saving}>
            {saving ? "Saving..." : "Update Project"}
          </button>
        </div>

      </div>
    </div >
  );
};

export default EditorPage;