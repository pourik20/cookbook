import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';

const RecipeRating = (props) => {
  const [stars, setStars] = useState([mdiStarOutline, mdiStarOutline, mdiStarOutline, mdiStarOutline, mdiStarOutline]);
  const [rating, setRating] = useState(0);

  function showRating(rating) {
    const newStars = [...stars];

    let i = 0;
    while (i < rating/2) {
      newStars[i] = mdiStar;
      i++;
    }

    while (i < 5) {
      newStars[i] = mdiStarOutline;
      i++;
    }

    setStars(newStars);
  }

  function sendRating(score){
    setRating(score)

    fetch("recipe/rate", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        "id": props.recipeId,
        "score": score
      })
    })

    props.setLoad(true);
  }

  useEffect(() => {
    showRating(rating);
  }, [rating])

  return (
    <>
      <Stack className="text-dark">
        <h2>Did you like the recipe?</h2>
        <Stack direction="horizontal" className="text-secondary ps-4">
          <Icon className="star" path={stars[0]} title="StarOutline" size={1.3} onClick={(e) => sendRating(2)} />
          <Icon className="star" path={stars[1]} title="StarOutline" size={1.3} onClick={(e) => sendRating(4)} />
          <Icon className="star" path={stars[2]} title="StarOutline" size={1.3} onClick={(e) => sendRating(6)} />
          <Icon className="star" path={stars[3]} title="StarOutline" size={1.3} onClick={(e) => sendRating(8)} />
          <Icon className="star" path={stars[4]} title="StarOutline" size={1.3} onClick={(e) => sendRating(10)} />
        </Stack>
      </Stack>
    </>
  );
};

export default RecipeRating;