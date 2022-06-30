import styled from "styled-components"
import { Button  } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'


function SortRecipes() {
    return (
      <Align>

      <div className="input-group pb-2">
      <h5 className="input-group">Sort All Recipes</h5>
      <NavLink to={'/'}>
      <Button style={{ marginRight: "10px" }} variant="outline-primary">A-Z</Button>
      </NavLink>
      <NavLink to={'/reverse_order'}>
      <Button style={{ marginRight: "10px" }} variant="outline-primary">Z-A</Button>
      </NavLink>
      </div>
      </Align>
    )
  }
  
  const Align = styled.div`
  text-align: start;
  margin: 5px, 5px, 5px, 5px;
  margin-left: 20px;
`;

  export default SortRecipes