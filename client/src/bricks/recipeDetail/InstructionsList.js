import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Sonnet from "./Sonnet";


const InstructionsList = (props) => {
  const [recipeInstructions, setRecipeInstructions] = useState(null);
  const [sonnets, setSonnets] = useState(null);

  useEffect(() => {
    //recipe instructions
    setRecipeInstructions(getRecipeInstructions());
    setSonnets(getSonnets());
  }, [props.recipe]);

  function getRecipeInstructions() {
    const numberOfInstructions = props.recipe.text[0].length;
    const result = []

    for (let i = 1; i < numberOfInstructions + 1; i++) {
      let link = "#link" + i;
      result.push(<ListGroup.Item action variant="light" href={link} key={i}>Step {i}</ListGroup.Item>);
    }

    return result;
  }

  function getSonnets(){
    const numberOfInstructions = props.recipe.text[0].length;
    const result = []

    for (let i = 1; i < numberOfInstructions + 1; i++) {
      let link = "#link" + i;
      result.push(<Tab.Pane eventKey={link} key={i}><Sonnet number={i} text={props.recipe.text[0][i-1]}/></Tab.Pane>);
    }

    return result;
  }

  return (
    <>
      <Container>
        <h2 className="pb-2">Instructions</h2>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={3}>
              <ListGroup>
                {recipeInstructions}
              </ListGroup>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {sonnets}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

export default InstructionsList;