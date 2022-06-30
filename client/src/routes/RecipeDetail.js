//627e82b374735bea4069cfae
import { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import RecipeHeader from "../bricks/recipeDetail/RecipeHeader";
import RecipeBasicInfo from "../bricks/recipeDetail/RecipeBasicInfo";
import InstructionsList from "../bricks/recipeDetail/InstructionsList";
import IngredientsList from "../bricks/recipeDetail/IngredientsList";
import RecipeRating from "../bricks/recipeDetail/RecipeRating";

const RecipeDetail = () => {
  //load data
  const [recipe, setRecipeDetail] = useState(null);
  const [ingredientList, setIngredientList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    //load recipe data
    const url = new URL(window.location)
    const recipeId = url.searchParams.get("id");
    setId(recipeId);
    setImage(url.searchParams.get("img"));

    fetch(`/recipe/get?id=${recipeId}`)
      .then(response => response.json())
      .then(data => setRecipeDetail(data))

    //load ingredients data
    fetch('/ingredient/list')
      .then(response => response.json())
      .then(data => setIngredientList(data))
      
    //load categories data
    fetch('/category/list')
      .then(response => response.json())
      .then(data => setCategoryList(data))

    setLoad(false);
  }, [load])

  return (
    <>
      {recipe && ingredientList&& categoryList && image &&
        <Container>
          <Row className="mt-5">
            <RecipeHeader recipe={recipe} recipeId={id} setLoad={setLoad} ingredientList={ingredientList} categoryList={categoryList}/>
          </Row>
          <Row className="mt-5">
            <RecipeBasicInfo recipe={recipe} image={image}/>
          </Row>
          <Row className="mt-5">
            <IngredientsList recipe={recipe}/>
          </Row>
          <Row className="mt-5">
            <InstructionsList recipe={recipe}/>
          </Row>
          <Row className="my-5">
            <RecipeRating recipeId={id} setLoad={setLoad}/>
          </Row>
        </Container>
      }
    </>
  );
};

export default RecipeDetail;
