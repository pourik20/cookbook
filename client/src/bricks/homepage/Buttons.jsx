import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function Buttons() {
    return (
      <Align>
        <div> 
      <Button style={{ marginRight: "10px" }} variant="outline-primary" href="/ingredients">Ingredients </Button>
      <Button variant="outline-primary" href="/categories">Categories</Button>
      </div>
      </Align>
    )
  }
  
  const Align = styled.div`
  text-align: start;
  margin: 5px, 5px, 5px, 5px;
  padding-left: 20px;
  padding-top: 20px;

`;

export default Buttons