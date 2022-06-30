import { useState, useEffect } from 'react';
import React from 'react'

import RecipeText from "../bricks/homepage/RecipeText";
import RecipeList from "../bricks/homepage/RecipeList";
import CreateRecipeButton from "../bricks/homepage/CreateRecipeButton";
import SortRecipes from "../bricks/homepage/SortRecipes";
import Buttons from '../bricks/homepage/Buttons';
import GetCategories from '../bricks/homepage/getCategories';


function Recipes() {
  return (
    <div>
        <Buttons/>
        <RecipeText />
        <CreateRecipeButton/>
        <SortRecipes />
        <GetCategories />
       <RecipeList /> 
    </div>    
  );
}

export default Recipes;