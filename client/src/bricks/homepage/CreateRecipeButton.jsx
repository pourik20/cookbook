import { useState, useEffect } from 'react';
import styled from "styled-components"
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import RecipeForm from '../RecipeForm/RecipeForm';


function CreateRecipeButton(props) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <Center>
      <div>
        <Button variant="outline-primary" onClick={() => setShowCreate(true)}>Create New Recipe</Button>
      </div>
      <RecipeForm show={showCreate} onHide={() => setShowCreate(false)}/>
    </Center>
  )
}

  const Center = styled.div`
  text-align: center;
`;

  export default CreateRecipeButton