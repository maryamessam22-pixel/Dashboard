import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar } from 'lucide-react'; // Icons
import RichTextEditor from '../components/common/RichTextEditor'; 
import './EditBlog.css';
// import Layout from '../layout/Layout';

const EditBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    typeEn: '',
    typeAr: '',
    startDate: '',
    endDate: '',
    mainTitleEn: '',
    mainTitleAr: '',
    subtitleEn: '',
    subtitleAr: '',
    descEn: '',
    descAr: '',
    // SEO Data
    slug: '',
    metaTitle: '',
    metaDescription: '',
    imageAlt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-blog-container">
      {/* <Layout/> */}
     
      <div className="page-header">
        <span className="breadcrumb">Pages / Edit Blog</span>
        <button className="close-btn" onClick={() => navigate(-1)}>
            <div className="close-icon-circle"><X size={18} /></div>
        </button>
      </div>

      <div className="blog-form-wrapper">
        
        
        <div className="top-section-grid">
            
           
            <div className="blog-image-upload">
                <div className="upload-content">
                    <span className="camera-icon">📷</span>
                    <span>upload image</span>
                </div>
            </div>

           
            <div className="basic-info-grid">
                
               
                <div className="form-group">
                    <label>Blog Title (EN)</label>
                    <input 
                        type="text" name="titleEn" className="std-input" 
                        value={formData.titleEn} onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="text-right">اسم المقال (AR)</label>
                    <input 
                        type="text" name="titleAr" className="std-input text-right" 
                        value={formData.titleAr} onChange={handleChange}
                    />
                </div>

              
                <div className="form-group">
                    <label>Blog Type (EN)</label>
                    <input 
                        type="text" name="typeEn" className="std-input" 
                        value={formData.typeEn} onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="text-right">نوع المقال (AR)</label>
                    <input 
                        type="text" name="typeAr" className="std-input text-right" 
                        value={formData.typeAr} onChange={handleChange}
                    />
                </div>

                
                <div className="form-group">
                    <label>Start date</label>
                    <div className="date-input-wrapper">
                        <input type="date" name="startDate" className="std-input date-field" onChange={handleChange} />
                        
                    </div>
                </div>
                <div className="form-group">
                    <label>End date</label>
                    <div className="date-input-wrapper">
                        <input type="date" name="endDate" className="std-input date-field" onChange={handleChange} />
                    </div>
                </div>

            </div>
        </div>

    
        <div className="content-section">
            
       
            <div className="form-row">
                <div className="form-group half">
                    <label>Title (EN)</label>
                    <input type="text" name="mainTitleEn" className="std-input" onChange={handleChange} />
                </div>
                <div className="form-group half">
                    <label className="text-right">عنوان (AR)</label>
                    <input type="text" name="mainTitleAr" className="std-input text-right" onChange={handleChange} />
                </div>
            </div>

        
            <div className="form-row">
                <div className="form-group half">
                    <label>Subtitle (EN)</label>
                    <input type="text" name="subtitleEn" className="std-input" onChange={handleChange} />
                </div>
                <div className="form-group half">
                    <label className="text-right">عنوان فرعي (AR)</label>
                    <input type="text" name="subtitleAr" className="std-input text-right" onChange={handleChange} />
                </div>
            </div>

       
            <div className="form-group">
                <label>Description (EN)</label>
                <RichTextEditor 
                    value={formData.descEn} 
                    onChange={(val) => setFormData({...formData, descEn: val})} 
                    placeholder="Write content here..."
                />
            </div>

         
            <div className="form-group">
                <label className="text-right">الوصف (AR)</label>
                <div dir="rtl">
                    <RichTextEditor 
                        value={formData.descAr} 
                        onChange={(val) => setFormData({...formData, descAr: val})} 
                        placeholder="اكتب المحتوى هنا..."
                    />
                </div>
            </div>

        </div>

        {/* --- SEO Section (Purple Box) --- */}
        <div className="blog-seo-box">
            <div className="seo-header">
                <div className="seo-title-row">
                    {/* <span className="search-icon">🔍</span> */}
                    <h3>Blog SEO</h3>
                    <span className="badge">Global Requirement</span>
                </div>
                <div className="seo-line"></div>
            </div>

            <div className="form-group">
                <label className="seo-label">Slug/URL</label>
                <div className="slug-wrapper">
                    <span className="prefix">mariamfarid.com/</span>
                    <input type="text" className="slug-input" placeholder="Project-slug" name="slug" onChange={handleChange}/>
                </div>
            </div>

            <div className="form-group">
                <label className="seo-label">Meta Title (Page Title)</label>
                <input type="text" className="seo-input-field" placeholder="SEO Title displayed in Google Search" name="metaTitle" onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label className="seo-label">Meta Description</label>
                <textarea className="seo-textarea" placeholder="Brief summary for search engines..." name="metaDescription" onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
                <label className="seo-label">Featured Image Alt Text</label>
                <input type="text" className="seo-input-field" placeholder="Describe the image for accessibility and SEO" name="imageAlt" onChange={handleChange}/>
            </div>
        </div>

      </div>

      <div className="footer-actions">
         <button className="btn-draft">Save Draft</button>
         <button className="btn-publish">Publish Project</button>
      </div>

    </div>
  );
};

export default EditBlog;