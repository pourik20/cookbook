import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import {  } from 'react-bootstrap'

function RecipeText() {
    return (
      <Center>
      <div >
        <h1>Search All Recipes</h1>
        <p>Trying to find best recipe? No worries! In this page you will find all that you need for your breakfast, lunch and dinner.</p>

      </div>

      </Center>
    )
  }
  
  const Center = styled.div`
  text-align: center;
  padding-top: 5%;
`;

  export default RecipeText