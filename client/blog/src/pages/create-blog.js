import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateBlog = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [blog, setblog] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setblog({ ...blog, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...blog.ingredients];
    ingredients[index] = value;
    setblog({ ...blog, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...blog.ingredients, ""];
    setblog({ ...blog, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:1000/blog",
        { ...blog },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={blog.name}
          onChange={handleChange}
        />
        {/* <label htmlFor="description">Description</label> */}
        {/* <textarea
          id="description"
          name="description"
          value={blog.description}
          onChange={handleChange}
        ></textarea> */}
        {/* <label htmlFor="ingredients">Ingredients</label> */}
        {/* {blog.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))} */}
        {/* <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button> */}
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          
          value={blog.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={blog.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={blog.cookingTime}
          onChange={handleChange}
        />
        <button className="but" type="submit">Create Recipe</button>
      </form>
    </div>
  );
};