import React, {useEffect, useState} from 'react';
import { Plus } from "lucide-react";
import { Link } from "react-router-dom"; 
import BlogsRow from "./BlogsRow"; 
import "./Blogs.css"; 
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import { supabase} from '../../config/Supabase';

const Blogs = () => {
   const [loading, setLoading] = useState(true)
   const [Blogs, setBlogs] = useState([]) // Initialize as empty array
  
  useEffect (()=>{
    async function getAllBlogsAPI(){
      const res = await supabase.from("Blogs").select("*")
      setBlogs(res.data || []);
      setLoading(false);
  }
       getAllBlogsAPI()
  },[]);
  
 if (loading) {
  return (
    <div className="loading-center">
      <p>Loading...</p>
    </div>
  );
}

  return (
    <div className="app-container">
      <div className="table-card">
        <Header title="Pages/ Blogs" />

        <div className="add-new-container">
          <Link to="/add-new-blog" style={{ textDecoration: "none" }}>
            <button className="add-new-btn">
                <Plus size={16} style={{ marginRight: "8px" }} />
                Add New Blog
            </button>
          </Link>
        </div>

        <Layout>
            <div className="table-header">
            <div className="header-cell pl-4">Blog Name</div>
            <div className="header-cell">Category</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Views</div>
            <div className="header-cell">Date</div>
            <div className="header-cell center">Actions</div>
            </div>

            <div className="table-body">
            {Blogs && Blogs.map((blog) => (
                <BlogsRow 
                key={blog.id}
                img={blog.thumbnail_image} 
                title={blog.blog_title} 
                date={blog.cover_image} 
                category={blog.category} 
                status={blog.status} 
                views={blog.views} 
                published={blog.published_date} 
                {...blog}
                />
            ))}
            </div>
        </Layout>
      </div>
    </div>
  );
};

export default Blogs;