import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Trash2, ArrowLeft, Save, Upload } from 'lucide-react';
import './AddNewBlog.css';
import { supabase } from '../../config/Supabase';

const AddNewBlog = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);


    const [formData, setFormData] = useState({
        page_title: '',
        page_subtitle: '',
        blog_title: '',
        thumbnail_image: '',
        status: 'draft',
        date: '',
        category: '',
        cover_img: '',


        introTitle: '',
        introText: '',
        conclusionTitle: '',
        conclusionText: '',
        tableOfContents: [''],
        sections: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            // Bucket name: portfolio-assets
            const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file);
            if (uploadError) throw uploadError;
            const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
            setFormData(prev => ({ ...prev, [field]: data.publicUrl }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

   
    const handleTocChange = (index, value) => {
        const newToc = [...formData.tableOfContents];
        newToc[index] = value;
        setFormData(prev => ({ ...prev, tableOfContents: newToc }));
    };
    const addTocItem = () => {
        setFormData(prev => ({ ...prev, tableOfContents: [...prev.tableOfContents, ''] }));
    };
    const removeTocItem = (index) => {
        setFormData(prev => ({ ...prev, tableOfContents: prev.tableOfContents.filter((_, i) => i !== index) }));
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...formData.sections];
        newSections[index] = { ...newSections[index], [field]: value };
        setFormData(prev => ({ ...prev, sections: newSections }));
    };
    const addSection = () => {
        setFormData(prev => ({
            ...prev,
            sections: [...prev.sections, { name: '', link: '', keyword: '', description: '' }]
        }));
    };
    const removeSection = (index) => {
        setFormData(prev => ({ ...prev, sections: prev.sections.filter((_, i) => i !== index) }));
    };

    const handleSave = async (publishStatus) => {
        setLoading(true);
        try {
            const finalStatus = publishStatus || formData.status;


            const contentJson = {
                introduction: {
                    title: formData.introTitle,
                    text: formData.introText
                },
                tableOfContents: formData.tableOfContents.filter(i => i && i.trim() !== ''),
                mainSections: formData.sections,
                conclusion: {
                    title: formData.conclusionTitle,
                    text: formData.conclusionText
                }
            };

            const payload = {
                page_title: formData.page_title,
                page_subtitle: formData.page_subtitle,
                blog_title: formData.blog_title,
                thumbnail_image: formData.thumbnail_image,
                status: finalStatus,
                date: formData.date || null,
                category: formData.category,
                cover_img: formData.cover_img,
                content: contentJson
            };

            const res = await supabase.from('Blogs').insert([payload]);

            if (res.error) throw res.error;
            alert("Blog created successfully!");
            navigate("/blogs");
        } catch (err) {
            console.error("Error creating blog:", err);
            alert(`Error creating blog: ${err.message || JSON.stringify(err)}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-blog-container">
            <div className="page-header">
                <div className="breadcrumb-row">
                    <span className="breadcrumb">Pages / Add New Blog</span>
                </div>
                <button className="close-btn" onClick={() => navigate(-1)}>
                    <div className="close-icon-circle"><X size={18} /></div>
                </button>
            </div>

            <div className="split-layout">

                <div className="left-panel">
                    <div className="panel-box image-box" style={{ position: 'relative' }}>
                        <label>Cover Image</label>
                        <div
                            className="image-preview"
                            style={{
                                backgroundImage: `url(${formData.cover_img})`,
                                cursor: 'pointer',
                                border: '2px dashed rgba(255,255,255,0.2)'
                            }}
                        >
                            {!formData.cover_img && <div className="placeholder"><Upload size={24} /><span>Upload Cover</span></div>}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'cover_img')}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    <div className="panel-box image-box mt-4" style={{ position: 'relative' }}>
                        <label>Thumbnail</label>
                        <div
                            className="image-preview thumbnail"
                            style={{
                                backgroundImage: `url(${formData.thumbnail_image})`,
                                height: '150px',
                                cursor: 'pointer',
                                border: '2px dashed rgba(255,255,255,0.2)'
                            }}
                        >
                            {!formData.thumbnail_image && <div className="placeholder"><Upload size={20} /><span>Upload Thumbnail</span></div>}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'thumbnail_image')}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    <div className="panel-box mt-4">
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="std-input">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <div className="panel-box mt-4">
                        <label>Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="std-input" />
                    </div>
                </div>


                <div className="right-panel">


                    <div className="panel-box">
                        <div className="form-row">
                            <div className="form-group half">
                                <label>Page Title</label>
                                <input type="text" name="page_title" value={formData.page_title} onChange={handleChange} className="std-input" placeholder="Browser Title" />
                            </div>
                            <div className="form-group half">
                                <label>Page Subtitle</label>
                                <input type="text" name="page_subtitle" value={formData.page_subtitle} onChange={handleChange} className="std-input" placeholder="Subtitle" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group half">
                                <label>Blog Main Title</label>
                                <input type="text" name="blog_title" value={formData.blog_title} onChange={handleChange} className="std-input" placeholder="Main Heading" />
                            </div>
                            <div className="form-group half">
                                <label>Category</label>
                                <input type="text" name="category" value={formData.category} onChange={handleChange} className="std-input" placeholder="e.g. UX Design" />
                            </div>
                        </div>
                    </div>

                    <div className="panel-box mt-4">
                        <h3>Content Builder</h3>


                        <div className="builder-section">
                            <h4>Introduction</h4>
                            <input type="text" name="introTitle" value={formData.introTitle} onChange={handleChange} className="std-input mb-2" placeholder="Intro Title" />
                            <textarea name="introText" value={formData.introText} onChange={handleChange} className="std-textarea" rows={4} placeholder="Intro Text..." />
                        </div>


                        <div className="builder-section mt-4">
                            <h4>Table of Contents</h4>
                            {formData.tableOfContents.map((item, idx) => (
                                <div key={idx} className="toc-row">
                                    <input type="text" value={item} onChange={(e) => handleTocChange(idx, e.target.value)} className="std-input" placeholder={`Point ${idx + 1}`} />
                                    <button onClick={() => removeTocItem(idx)} className="icon-btn-danger"><Trash2 size={16} /></button>
                                </div>
                            ))}
                            <button onClick={addTocItem} className="btn-secondary-small"><Plus size={14} /> Add Item</button>
                        </div>


                        <div className="builder-section mt-4">
                            <h4>Main Sections</h4>
                            {formData.sections.map((section, idx) => (
                                <div key={idx} className="builder-card">
                                    <div className="card-header">
                                        <span>Section {idx + 1}</span>
                                        <button onClick={() => removeSection(idx)} className="icon-btn-danger"><Trash2 size={16} /></button>
                                    </div>
                                    <div className="card-body">
                                        <input type="text" value={section.name} onChange={(e) => handleSectionChange(idx, 'name', e.target.value)} className="std-input mb-2" placeholder="Section Header" />
                                        <div className="row-2">
                                            <input type="text" value={section.keyword} onChange={(e) => handleSectionChange(idx, 'keyword', e.target.value)} className="std-input mb-2" placeholder="Keyword" />
                                            <input type="text" value={section.link} onChange={(e) => handleSectionChange(idx, 'link', e.target.value)} className="std-input mb-2" placeholder="Link (Optional)" />
                                        </div>
                                        <textarea value={section.description} onChange={(e) => handleSectionChange(idx, 'description', e.target.value)} className="std-textarea" rows={3} placeholder="Content..." />
                                    </div>
                                </div>
                            ))}
                            <button onClick={addSection} className="btn-secondary-small"><Plus size={14} /> Add Section</button>
                        </div>


                        <div className="builder-section mt-4">
                            <h4>Conclusion</h4>
                            <input type="text" name="conclusionTitle" value={formData.conclusionTitle} onChange={handleChange} className="std-input mb-2" placeholder="Conclusion Title" />
                            <textarea name="conclusionText" value={formData.conclusionText} onChange={handleChange} className="std-textarea" rows={4} placeholder="Conclusion Text..." />
                        </div>
                    </div>

                </div>
            </div>

            <div className="footer-actions floating">
                <button className="btn-text" onClick={() => navigate(-1)}>Cancel</button>
                <button className="btn-primary" onClick={() => handleSave()} disabled={loading}>
                    <Save size={18} />
                    {loading ? "Saving..." : "Save Blog"}
                </button>
            </div>
        </div>
    );
};

export default AddNewBlog;