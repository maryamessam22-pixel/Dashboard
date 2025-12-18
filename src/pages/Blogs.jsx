import React, {useEffect, useState} from 'react';
import { Plus } from "lucide-react";
import { Link } from "react-router-dom"; 
// ✅ CORRECT IMPORT: Importing BlogsRow instead of ProjectRow
import BlogsRow from "../components/BlogsRow"; 
import "./Blogs.css"; 
import Layout from "../layout/Layout";
import Header from "../components/Header";
import { supabase} from '../Supabase';

// Import your images
// import blog1Img from "../assets/blog1.png"; 
// import blog2Img from "../assets/blog2.png"; 

// Data
// const blogsData = [
//   {
//     id: 1,
//     img: blog1Img, 
//     title: "UI/UX Designer Do?",
//     date: "March 13",
//     category: "About UI/UX",
//     status: "Draft",
//     views: "1.6k",
//     published: "Sep 20, 2024"
//   },
//   {
//     id: 2,
//     img: blog2Img, 
//     title: "My creative friends",
//     date: "August 12",
//     category: "Creativity",
//     status: "Published",
//     views: "4.9k",
//     published: "Aug 10, 2024"
//   }
// ];

const Blogs = () => {


  
   const [loading, setLoading] = useState(true)
   const [Blogs, setBlogs] = useState("")
  
  useEffect (()=>{
    
    
    async function getAllBlogsAPI(){
      const res = await supabase.from("Blogs").select("*")
      setBlogs(res.data);
      // console.log(res);
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

        <Layout />

   
        <div className="table-header">
          <div className="header-cell pl-4">Blog Name</div>
          <div className="header-cell">Category</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Views</div>
          <div className="header-cell">Date</div>
          <div className="header-cell center">Actions</div>
        </div>

        <div className="table-body">
          {Blogs.map((blog) => (
          
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
      </div>
    </div>
  );
};

export default Blogs;