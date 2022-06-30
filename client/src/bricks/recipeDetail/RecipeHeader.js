import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DeleteRecipe from './modals/DeleteRecipe';
import ShareRecipe from './modals/ShareRecipe';
import RecipeForm from '../RecipeForm/RecipeForm.js';

import Icon from '@mdi/react';
import { mdiShare } from '@mdi/js';
import { mdiDelete } from '@mdi/js';
import { mdiPencil } from '@mdi/js';
import { mdiStar } from '@mdi/js';
import { mdiStarHalfFull } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';

const RecipeHeader = (props) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [rating, setRating] = useState();

  useEffect(() => {
    setRating(getRating());
  }, [props.recipe.rating])

  function getRating() {
    //count average rating
    let averageRating = 0;

    if (props.recipe.rating.length !== 0) {
      props.recipe.rating.forEach(rater => {
        averageRating += parseInt(rater.score);
      });

      averageRating = Math.round(averageRating / props.recipe.rating.length);
    }

    //convert average rating to stars
    let numberOfFullStars = Math.floor(averageRating / 2);
    let numberOfHalfStars = averageRating % 2;

    let stars = [];
    let i = 0;

    //full stars
    while (i < numberOfFullStars) {
      stars.push(<Icon path={mdiStar} title="Star" key={i} size={1} />);
      i++;
    }

    //half full stars
    while (i < numberOfFullStars + numberOfHalfStars) {
      stars.push(<Icon path={mdiStarHalfFull} title="StarHalfFull" key={i} size={1} />);
      i++;
    }

    //empty stars
    while (i < 5) {
      stars.push(<Icon path={mdiStarOutline} title="StarOutline" key={i} size={1} />);
      i++;
    }

    return stars;
  }

  return (
    <>
      <Container className="text-dark">
        <Row>
          <Col md={9}>
            <h2 className='h1'>{props.recipe.name}</h2>
            <Stack direction="horizontal">
              {rating}
            </Stack>
          </Col>
          <Col md={3} className="d-flex flex-row pb-2 pt-3 px-2 h-75">
            <Button variant="outline-secondary" onClick={() => setShowShare(true)}>
              <Icon path={mdiShare} title="Share" size={1} />
              Share
            </Button>
            <Button variant="outline-primary" className="ms-1" onClick={() => setShowUpdate(true)}>
              <Icon path={mdiPencil} title="Edite" size={1} />
              Edit
            </Button>
            <Button variant="outline-danger" className="ms-1" onClick={() => setShowDelete(true)}>
              <Icon path={mdiDelete} title="Delete" size={1} />
              Delete
            </Button>
          </Col>
        </Row>
        <Row>
          <hr />
        </Row>
      </Container>
      <RecipeForm isUpdate={true} recipe={props.recipe} recipeId={props.recipeId} show={showUpdate} ingredientList={props.ingredientList} categoryList={props.categoryList} onHide={() => setShowUpdate(false)} />
      <ShareRecipe show={showShare} onHide={() => setShowShare(false)} />
      <DeleteRecipe recipeId={props.recipeId} show={showDelete} onHide={() => setShowDelete(false)} />
    </>
  );
};

export default RecipeHeader;