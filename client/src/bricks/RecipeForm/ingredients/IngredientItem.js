import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { mdiPencil } from '@mdi/js';

const IngredientItem = (props) => {
    return  props.recipeIngredients.map((ingredient, id) => (
        <div key={ingredient.ingredient.name}>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>{id + 1}</InputGroup.Text>
                <Form.Control
                    type="text"
                    id={id}
                    defaultValue={ingredient.ingredient.name}
                    title={id}
                    arial-label={id}
                    disabled
                />
                <InputGroup.Text>Amount:</InputGroup.Text>
                <Form.Control
                    type="text"
                    id={id}
                    key={id}
                    value={ingredient.amount}
                    title={id}
                    arial-label={id}
                    onChange={(e) => props.updateIngredient(ingredient.ingredient._id, e.target.value)}
                />
                <InputGroup.Text>{ingredient.ingredient.units}</InputGroup.Text>
                <Button variant="danger" >
                    <Icon path={mdiDelete} title="Delete" size={1} onClick={() => props.removeIngredient(ingredient.ingredient._id)}/>
                </Button>
            </InputGroup>
        </div>
    ));
};

export default IngredientItem;