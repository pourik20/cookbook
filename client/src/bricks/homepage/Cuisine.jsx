import React, { useState, useEffect } from 'react'
import Buttons from './Buttons'
import RecipeText from './RecipeText'
import SortRecipes from './SortRecipes'
import GetCategories from './getCategories'
import CreateRecipeButton from './CreateRecipeButton'
import { useParams } from 'react-router-dom'
import IngredientList from './RecipeList'

function Cuisine() {
  let params = useParams();

  return (
    <div>
      <Buttons />
      <RecipeText />
      <CreateRecipeButton />
      <SortRecipes />
      <GetCategories />
      <IngredientList Cuisine={params.type} />



    </div>
  )
}

export default Cuisine