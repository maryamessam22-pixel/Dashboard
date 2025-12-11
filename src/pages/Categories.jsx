import React, { useState } from 'react';
import './Categories.css'; 
import Layout from '../layout/Layout'; 
import Header from '../components/Header';
import RichTextEditor from '../components/common/RichTextEditor'; 

const Categories = () => {
  
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    descEn: '',
    descAr: ''
  });

  const [seoData, setSeoData] = useState({
    slug: '',
    metaTitle: '',
    metaDescription: '',
    imageAlt: ''
  });

  const categoriesList = [
    { id: 1, name: 'UI/UX' },
    { id: 2, name: 'Motion Graphics' },
    { id: 3, name: 'Photography' },
    { id: 4, name: '3D Modeling' },
    { id: 5, name: 'Augmented Reality' },
    { id: 6, name: 'Graphic Design' },
  ];

  return (
    <>
      <Layout />
      <div className="categories-container">
        
        <Header title="Pages / Taxonomy" />
        <h2 className="page-main-title">Content Structure</h2>

        <div className="main-grid">
          
        
          <div className="left-column">
            
            <div className="tabs-row">
                <span className="tab active">Category</span>
                <span className="tab">Tag</span>
                <span className="tab">Static page</span>
            </div>

            <div className="card-panel">
                <h3 className="panel-title">Create category</h3>
                
              
                <div className="form-row">
                    <div className="form-group">
                        <label>Title (EN)</label>
                        <input 
                          type="text" 
                          className="std-input" 
                          placeholder="Categories"
                          value={formData.titleEn}
                          onChange={(e) => setFormData({...formData, titleEn: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-right">العنوان (AR)</label>
                        <input 
                          type="text" 
                          className="std-input text-right" 
                          placeholder="واجهة المستخدم"
                          value={formData.titleAr}
                          onChange={(e) => setFormData({...formData, titleAr: e.target.value})}
                        />
                    </div>
                </div>

                
                <div className="form-group">
                    <label>Description (EN)</label>
                    <RichTextEditor
                        value={formData.descEn}
                       
                        onChange={(content) => setFormData({ ...formData, descEn: content })}
                        placeholder="Showcasing my creative journey through diverse UI/UX projects..."
                    />
                </div>

                <div className="form-group">
                    <label className="text-right">الوصف الوظيفي (AR)</label>
                    <div dir="rtl"> 
                      <RichTextEditor
                          value={formData.descAr}
                          onChange={(content) => setFormData({ ...formData, descAr: content })}
                          placeholder="عرض رحلتي الإبداعية من خلال مجموعة متنوعة..."
                      />
                    </div>
                </div>
            </div>


        <div className="upload-grid2">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="upload-box-mini2">
                <span className="camera-icon2">📷</span>
                <span className="upload-text2">Upload Image</span>
             </div>
           ))}
        </div>






            {/* --- SEO Section --- */}
            <div className="seo-section">
                <div className="seo-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <h3>Category SEO</h3> 
                  <span className="badge">Global Requirement</span>
                </div>
                <div className="seo-divider"></div>

                <div className="input-group">
                  <label className="seo-label">Slug/URL</label>
                  <div className="slug-input-wrapper">
                      <span className="slug-prefix">mariamfarif.com/</span>
                      <input
                      type="text"
                      placeholder="Project-slug"
                      value={seoData.slug}
                      onChange={(e) => setSeoData({ ...seoData, slug: e.target.value })}
                      />
                  </div>
                </div>

                <div className="input-group">
                  <label className="seo-label">Meta Title (Page Title)</label>
                  <input
                      className="seo-input"
                      type="text"
                      placeholder="SEO Title displayed in Google Search"
                      value={seoData.metaTitle}
                      onChange={(e) => setSeoData({ ...seoData, metaTitle: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="seo-label">Meta Description</label>
                  <textarea
                      className="seo-textarea"
                      placeholder="Brief summary for search engines..."
                      value={seoData.metaDescription}
                      onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="seo-label">Featured Image Alt Text</label>
                  <input
                      className="seo-input"
                      type="text"
                      placeholder="Describe the image for accessibility and SEO"
                      value={seoData.imageAlt}
                      onChange={(e) => setSeoData({ ...seoData, imageAlt: e.target.value })}
                  />
                </div>
            </div>

            <div className="action-buttons-row">
                <button className="btn-cancel">Cancel</button>
                <button className="btn-save">Save changes</button>
            </div>

          </div>

          <div className="right-column">
             <div className="list-header">
                <h3>Existing categories</h3>
                <button className="btn-add-small">+ Add New</button>
             </div>

             <div className="categories-list">
                {categoriesList.map(cat => (
                    <div key={cat.id} className="category-item">
                        <span>{cat.name}</span>
                        <div className="item-actions">
                            <i className="icon-edit">✎</i>
                            <i className="icon-delete">🗑</i>
                        </div>
                    </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Categories;