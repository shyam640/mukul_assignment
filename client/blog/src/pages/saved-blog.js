import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const baseURL = "http://localhost:1000" || window.location.protocol + '//' + window.location.host;

export const SavedBlog = () => {
  const [savedBlog, setSavedBlog] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedBlog = async () => {
      try {
        const response = await axios.get(
          baseURL+`/savedBlog/${userID}`
        );
        setSavedBlog(response.data.savedBlog);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedBlog();
  }, []);
  return (
    <div>
      <h1>Saved Blog</h1>
      <ul>
        {savedBlog.map((blog) => (
          <li key={blog._id}>
            <div>
              <h2>{blog.name}</h2>
            </div>
            <p>{blog.description}</p>
            <img src={blog.imageUrl} alt={blog.name} />
            <p>Cooking Time: {blog.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};