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
    return <div className="editor-page-wrapper" style={{ color: 'white' }}>Loading Project...</div>;
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


          <div className="left-column" style={{ flex: '0 0 350px' }}>
            <div className="section-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Cover Image</h3>

              <div
                className="upload-box"
                style={{
                  border: '2px dashed rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  background: project.coverImage ? 'rgba(0,0,0,0.2)' : 'transparent',
                  transition: 'border-color 0.2s'
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 5 }}
                />

                {uploading ? (
                  <span style={{ color: '#aaa' }}>Uploading...</span>
                ) : project.coverImage ? (
                  <div style={{ position: 'relative' }}>
                    <img src={project.coverImage} alt="Cover" style={{ width: '100%', borderRadius: '6px', display: 'block' }} />
                    <div style={{ marginTop: '10px', color: '#4ade80', fontSize: '0.9rem' }}>Click or Drag to replace</div>
                  </div>
                ) : (
                  <div style={{ color: '#ccc' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🖼️</div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Drag & drop or click to upload</p>
                  </div>
                )}
              </div>
            </div>

            <div className="section-card" style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Gallery Images</h3>

              {/* Existing Images Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px', marginBottom: '15px' }}>
                {project.images.map((img, i) => (
                  <div key={i} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      onClick={() => removeImage(i)}
                      style={{
                        position: 'absolute', top: '2px', right: '2px',
                        background: 'rgba(0,0,0,0.6)', color: 'white',
                        border: 'none', borderRadius: '50%', width: '20px', height: '20px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'
                      }}
                    >×</button>
                  </div>
                ))}
              </div>

              {/* Upload New Grid Item */}
              <div
                style={{
                  border: '2px dashed rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '15px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 5 }}
                />
                {uploading ? (
                  <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Uploading...</span>
                ) : (
                  <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                    <span>+ Add Images</span>
                  </div>
                )}
              </div>
            </div>
          </div>


          <div className="right-column" style={{ flex: 1 }}>
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
                  style={{ width: '100%', padding: '16px', background: 'var(--input-bg)', color: 'white', border: 'none', borderRadius: '8px', outline: 'none' }}
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

            <div className="description-section" style={{ marginTop: '30px' }}>
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

              <div className="editor-group" style={{ marginTop: '20px' }}>
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


            <div className="seo-section" style={{ marginBottom: '30px' }}>
              <div className="seo-header"><h3>Process Steps (Design Process)</h3></div>
              <div className="seo-divider"></div>
              <div className="dynamic-list">
                {project.processSteps.map((step, i) => (
                  <div key={i} className="list-item-row" style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                    <div style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', color: '#dcb0ff', fontWeight: 'bold' }}>{i + 1}</div>
                    <input
                      type="text"
                      className="seo-input"
                      value={step}
                      onChange={(e) => updateProcessStep(i, e.target.value)}
                      placeholder={`Step ${i + 1}`}
                    />
                    <button className="btn-remove" onClick={() => removeProcessStep(i)} style={{ background: 'none', border: 'none', color: '#ff2b5e', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                  </div>
                ))}
                <button className="btn-publish" style={{ background: 'rgba(255,255,255,0.1)', marginTop: '10px', border: '1px solid rgba(255,255,255,0.2)', width: 'auto' }} onClick={addProcessStep}>+ Add Step</button>
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
    </div>
  );
};

export default EditorPage;