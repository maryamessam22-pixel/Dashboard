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

  // Unified State matching Portfolio structure
  const [project, setProject] = useState({
    title: "",        // project_name_EN
    slug: "",
    type: "",         // projectType
    category: "",     // category_outside
    role: "",         // Role
    startDate: "",    // start_Date
    endDate: "",      // end_Date
    description: "",  // description_EN
    subtitle: "",     // subtitle_out
    metaTitle: "",    // Not explicitly in DB map but good to have
    metaDescription: "", // meta_dscription
    status: "draft",
    coverImage: "",   // cover_image
    images: [],       // images (JSONB array)
    processSteps: [], // processSteps (JSONB array)
    tools: [],        // tools
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
          metaTitle: "",
          imageAlt: ""
        });
      } else {
        console.error("Project not found or error:", res.error);
        // Fallback for slug if needed, but sticking to requested style mainly
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

  // Process Steps Logic
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

  // Images Logic (URLs for now)
  const addImage = () => {
    setProject(prev => ({ ...prev, images: [...prev.images, ""] }));
  };
  const updateImage = (index, val) => {
    const newImages = [...project.images];
    newImages[index] = val;
    setProject(prev => ({ ...prev, images: newImages }));
  };
  const removeImage = (index) => {
    setProject(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
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
        status: finalStatus,
        cover_image: project.coverImage,
        images: project.images,
        processSteps: project.processSteps,
        tools: project.tools
      };

      const { error } = await supabase
        .from('Projects')
        .update(updates)
        .eq('id', id); // We used basic ID fetch mostly, if we looked up by slug we'd need that ID. Ideally 'data' had ID.
      // But wait, if we fetched by slug, 'id' param is the slug. We need the real ID for update usually or use slug. 
      // Supabase update can filter by col.
      // Let's rely on the URL param 'id' being the key, or if it was slug, we update by slug.
      // A safer bet is to store the real ID in state if possible, but simplest is update by whatever we looked up by?
      // Actually, if 'id' from useParams is used for fetch, we can use it for update.
      // But if 'id' was a slug, we should eq('slug', id). 
      // I'll optimistically update by ID first (assuming numeric ID in URL), or slug if ID is not numeric?
      // Let's just use the 'id' param from URL for the .eq() logic and assume consistent usage.

      // Refined Update Logic:
      // We know what we queried with.

      let updateQuery = supabase.from('Projects').update(updates);
      // checking if id is numeric string
      if (/^\d+$/.test(id)) {
        updateQuery = updateQuery.eq('id', id);
      } else {
        updateQuery = updateQuery.eq('slug', id);
      }

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

        {/* Header */}
        <div className="editor-header">
          <div className="breadcrumb">Pages / <strong>Edit Project</strong></div>
          <button className="close-btn" onClick={() => navigate("/projects")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="top-layout">
          {/* Left Column: Visuals */}
          <div className="left-column" style={{ flex: '0 0 350px' }}>
            <div className="section-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Cover Image</h3>
              <div className="input-group">
                <label>Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={project.coverImage}
                  onChange={(e) => handleChange('coverImage', e.target.value)}
                />
              </div>
              {project.coverImage && (
                <div className="image-preview" style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={project.coverImage} alt="Cover" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              )}
            </div>

            <div className="section-card" style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Gallery Images</h3>
              <div className="dynamic-list">
                {project.images.map((img, i) => (
                  <div key={i} className="list-item-row" style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => updateImage(i, e.target.value)}
                      placeholder="Image URL"
                      style={{ flex: 1, padding: '8px', borderRadius: '4px', border: 'none', background: 'var(--input-bg)', color: 'white' }}
                    />
                    <button className="btn-remove" onClick={() => removeImage(i)} style={{ background: 'transparent', border: 'none', color: '#ff2b5e', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                  </div>
                ))}
                <button className="btn-add-small" onClick={addImage} style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>+ Add Image</button>
              </div>
            </div>
          </div>

          {/* Right Column: Main Info */}
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

            {/* Tools Section */}
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

            {/* Process Steps */}
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

            {/* SEO */}
            <div className="seo-section">
              <div className="seo-header"><h3>SEO Meta</h3></div>
              <div className="seo-divider"></div>
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