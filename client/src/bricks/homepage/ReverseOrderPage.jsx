import React from 'react'

import RecipeText from "../homepage/RecipeText";
import ReverseOrder from "../homepage/ReverseOrder";
import CreateRecipeButton from "../homepage/CreateRecipeButton";
import SortRecipes from "../homepage/SortRecipes";
import Buttons from '../homepage/Buttons';
import GetCategories from '../homepage/getCategories';


function Recipes() {
  return (
    <div>
        <Buttons />
        <RecipeText />
        <CreateRecipeButton />
        <SortRecipes />
        <GetCategories />
        <ReverseOrder /> 

    </div>
  );
}

export default Recipes;