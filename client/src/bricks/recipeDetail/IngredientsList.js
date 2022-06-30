import { useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

const IngredientsList = (props) => {
  const [numberOfRecipe, setNumberOfRecipe] = useState(1);
  const [recipeIngredients, setRecipeIngredients] = useState();

  useEffect(() => {
    setRecipeIngredients(getRecipeIngredients(numberOfRecipe));
  }, [props.recipe])

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecipeIngredients(getRecipeIngredients(numberOfRecipe));
  }

  function getRecipeIngredients(numberOfRecipe) {
    const result = [];

    props.recipe.ingredientList.forEach(ingredient => {
      result.push(<tr key={ingredient._id}><td>{ingredient.ingredient.name}</td><td>{ingredient.amount * numberOfRecipe} {ingredient.ingredient.units}</td></tr>);
    })

    return result;
  }


  return (
    <>
      <Container>
        <h2 className="pb-2">Ingredients</h2>
        <Row>
          <Col xl={3} lg={6} md={12}>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text>Portions:</InputGroup.Text>
                <Form.Control
                  type="number"
                  id="numberOfPortions"
                  min="1"
                  max="99"
                  size="2"
                  defaultValue="1"
                  title="Choose number of portions"
                  arial-label="Number of portions"
                  onChange={(e) => setNumberOfRecipe(e.target.value)}
                />
                <Button variant="outline-secondary" id="submit" type="submit">
                  Recount
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xl={3} lg={6} md={12}>
            <Table striped hover size="sm">
              <thead>
                <tr>
                  <th className="mx-auto">Ingredient</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recipeIngredients}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IngredientsList;