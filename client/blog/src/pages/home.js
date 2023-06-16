import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [savedBlogs, setsavedBlogs] = useState([]);
 
  const userID = useGetUserID();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:1000/blog");
        setBlogs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchsavedBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/blog/savedBlogs/ids/${userID}`
        );
        setsavedBlogs(response.data.savedblogs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
    fetchsavedBlogs();
  }, []);

  const saveblog = async (blogID) => {
    try {
      const response = await axios.put("http://localhost:1000/blog", {
        blogID,
        userID,
      });
      setsavedBlogs(response.data.savedBlogs);
    } catch (err) {
      console.log(err);
    }
   
  };

 
  // const isblogSaved = (id) => savedBlogs.includes(id);
  return (
    <div>
      <h1>Food-Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <div className="card">
            <img src={blog.imageUrl} alt={blog.name}  />
              <div className="container">
              <h3>Dish Name : {blog.name}</h3>
            </div>
            <div className="instructions">
               <h3>Instructions</h3>
               <div className="texta">
               <p className="ins">{blog.instructions}</p>
               </div>
            </div>
            <h3 className="cookingtime">Cooking Time: {blog.cookingTime} minutes</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};