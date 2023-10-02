import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = (props) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [Contributor, setContributor] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err){
        console.log(err);
      }
    };
    fetchSavedRecipes();
  }, []);

  useEffect(() => {
    async function fetchContributor() {
      let userDetail = await axios.get(`http://localhost:3001/recipes/userInfoById`, {
        params: {
          userId: props.details.userId,
        },
      });
      setContributor(userDetail.data[0].fullName);
    }
    fetchContributor();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
        {savedRecipes.map((recipe) => (
          <div key={recipe._id}>
          <div className="recipe"> 
          <div className="recipeimage"><img src={recipe.imageUrl} alt={recipe.name} /></div>
            <div className="content">
              <div className="recipename">{recipe.name} {Contributor}</div>
            <div className="ingredients">
                Ingredients:  {recipe.ingredients+""}
              </div>
          <div className="instructions">
            {recipe.instructions}
          </div>
          <div className="time">
          Cooking Time: {recipe.cookingTime} minutes
          </div>
            </div>
          </div>
          </div>
        ))}
    </div>
  );
};
