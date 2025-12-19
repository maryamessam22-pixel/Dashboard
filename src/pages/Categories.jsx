import React, { useEffect, useState } from "react";
import "./Categories.css";
import Layout from "../layout/Layout";
import Header from "../components/Header";
import RichTextEditor from "../components/common/RichTextEditor";
import { supabase } from "../Supabase";

const Categories = () => {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const [images, setImages] = useState(Array(6).fill(null)); 
  const [uploadingImg, setUploadingImg] = useState(false);

  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    descEn: "",
    descAr: "",
  });

  const [seoData, setSeoData] = useState({
    slug: '',
    metaTitle: '',
    metaDescription: '',
    imageAlt: ''
  });

  useEffect(() => {
    async function getAllCategoriesAPI() {
      try {
        
        const { data, error } = await supabase
          .from("page_sections")
          .select("*")
          .eq("page", "home")
          .eq("section", "category_sec") 
          .single();

        if (error) {
            console.warn("No data found or error fetching:", error.message);
        }

        if (data) {
            const tagsArray = data.tags || [];

            let parsedTags = tagsArray;
            if (typeof tagsArray === 'string') {
                try { parsedTags = JSON.parse(tagsArray); } catch(e) {}
            }

            setCategories(Array.isArray(parsedTags) ? parsedTags.map((tag, index) => ({
                id: index,
                name: tag,
            })) : []);

            setFormData({
                titleEn: data.title || "",
                titleAr: data.subtitle || "",
                descEn: data.description || "",
                descAr: data.description_ar || "", 
            });
   
            if (data.images) {
                let savedImages = data.images;
                // تأكد إن الصور مصفوفة
                if (typeof savedImages === 'string') {
                    try { savedImages = JSON.parse(savedImages); } catch(e) {}
                }
                
                if (Array.isArray(savedImages)) {
                    const fullImages = [...savedImages, ...Array(6 - savedImages.length).fill(null)];
                    setImages(fullImages.slice(0, 6));
                }
            }

            setSeoData({
                slug: data.slug || "",
                metaTitle: data.meta_title || "",
                metaDescription: data.meta_description || "",
                imageAlt: data.alt_text || ""
            });
        }

      } catch (error) {
        console.error("Unexpected Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getAllCategoriesAPI();
  }, []);


  const handleImageUpload = async (e, index) => {
    try {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingImg(true);

        const fileName = `cat-${Date.now()}-${file.name.replace(/\s/g, '')}`;
        const { error: uploadError } = await supabase.storage
            .from("portfolio")
            .upload(fileName, file);

        if (uploadError) throw uploadError;
       
        const { data: urlData } = supabase.storage
            .from("portfolio")
            .getPublicUrl(fileName);
       
        const newImages = [...images];
        newImages[index] = urlData.publicUrl;
        setImages(newImages);

    } catch (error) {
        console.error("Error uploading:", error);
        alert("Upload failed! Check console.");
    } finally {
        setUploadingImg(false);
    }
  };


  const handleDeleteImage = (index) => {
      const newImages = [...images];
      newImages[index] = null;
      setImages(newImages);
  };

 
  const handleSave = async () => {
    try {
      const updatedTags = categories.map(c => c.name);
      const validImages = images.filter(img => img !== null);

      const { error } = await supabase
        .from("page_sections")
        .update({
          title: formData.titleEn,
          subtitle: formData.titleAr,
          
          description: formData.descEn,     
          description_ar: formData.descAr,  
          
          tags: updatedTags,
          images: validImages,
          
          slug: seoData.slug,
          meta_title: seoData.metaTitle,
          meta_description: seoData.metaDescription,
          alt_text: seoData.imageAlt
        })
        .eq("page", "home")
        .eq("section", "category_sec"); 

      if (!error) {
          alert("Saved successfully! 🎉");
      } else {
          throw error;
      }
    } catch (err) {
      console.error("Error saving:", err);
      alert("Error saving data");
    }
  };

 if (loading) {
  return (
    <div className="loading-center">
      <p>Loading...</p>
    </div>
  );
}


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
              <h3 className="panel-title">Edit Category Section</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Title (EN)</label>
                  <input
                    type="text"
                    className="std-input"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="text-right">العنوان (AR)</label>
                  <input
                    type="text"
                    className="std-input text-right"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description (EN)</label>
                <RichTextEditor
                  value={formData.descEn}
                  onChange={(content) => setFormData({ ...formData, descEn: content })}
                  placeholder="Description..."
                />
              </div>

              <div className="form-group">
                  <label className="text-right">الوصف (AR)</label>
                  <div dir="rtl">
                    <RichTextEditor
                      value={formData.descAr}
                      onChange={(content) => setFormData({ ...formData, descAr: content })}
                      placeholder="وصف بالعربية..." 
                    />
                  </div>
              </div>
            </div>

            
            <label style={{fontWeight: "600", marginBottom: "10px", display: "block"}}>Category Images (Max 6)</label>
            <div className="upload-grid2">
               {images.map((imgUrl, index) => (
                 <div 
                    key={index} 
                    className="upload-box-mini2" 
                    style={{ 
                        backgroundImage: imgUrl ? `url(${imgUrl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        border: imgUrl ? '1px solid #ccc' : '2px dashed #ddd'
                    }}
                 >
                    <input 
                        type="file" 
                        accept="image/*"
                        id={`file-upload-${index}`}
                        style={{display: 'none'}}
                        onChange={(e) => handleImageUpload(e, index)}
                    />

                    {imgUrl ? (
                        <button 
                            className="delete-img-btn"
                            title="Delete Image"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage(index);
                            }}
                            style={{
                                position: 'absolute', top: -8, right: -8, 
                                background: '#ff4d4f', color: 'white', borderRadius: '50%', 
                                border: 'none', width: '24px', height: '24px', cursor: 'pointer', zIndex: 10,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                            }}
                        >
                            ×
                        </button>
                    ) : (
                        <label htmlFor={`file-upload-${index}`} style={{cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <span className="camera-icon2">📷</span>
                            <span className="upload-text2">{uploadingImg ? "..." : "Upload"}</span>
                        </label>
                    )}
                 </div>
               ))}
            </div>

        
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
                      <span className="slug-prefix">mariamfarid.com/</span>
                      <input
                        type="text"
                        placeholder="category-slug"
                        value={seoData.slug}
                        onChange={(e) => setSeoData({ ...seoData, slug: e.target.value })}
                      />
                  </div>
                </div>

                <div className="input-group">
                  <label className="seo-label">Meta Title</label>
                  <input
                      className="seo-input"
                      type="text"
                      placeholder="Page Title for Google"
                      value={seoData.metaTitle}
                      onChange={(e) => setSeoData({ ...seoData, metaTitle: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="seo-label">Meta Description</label>
                  <textarea
                      className="seo-textarea"
                      placeholder="Summary for search engines..."
                      value={seoData.metaDescription}
                      onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="seo-label">Alt Text</label>
                  <input
                      className="seo-input"
                      type="text"
                      placeholder="Image description for accessibility"
                      value={seoData.imageAlt}
                      onChange={(e) => setSeoData({ ...seoData, imageAlt: e.target.value })}
                  />
                </div>
            </div>

            <div className="action-buttons-row">
              <button className="btn-cancel">Cancel</button>
              <button className="btn-save" onClick={handleSave}>Save changes</button>
            </div>
          </div>

        
          <div className="right-column">
            <div className="list-header">
              <h3>Current Categories</h3>
              <button className="btn-add-small">+ Add New</button>
            </div>
            <div className="categories-list">
              {categories.length > 0 ? categories.map((cat) => (
                <div key={cat.id} className="category-item">
                  <span>{cat.name}</span>
                  <div className="item-actions">
                    <i className="icon-edit" style={{cursor: 'pointer'}}>✎</i>
                  </div>
                </div>
              )) : <p style={{padding:'10px', color:'#999'}}>No categories found</p>}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Categories;