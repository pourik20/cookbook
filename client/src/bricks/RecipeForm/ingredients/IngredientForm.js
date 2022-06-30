import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { mdiPencil } from '@mdi/js';

const IngredientForm = (props) => {
    const [ingredientOptions, setIngredientOptions] = useState();
    const [ingredientId, setIngredientId] = useState("1");
    const [amount, setAmount] = useState("1");
    const [unitLabel, setUnitLabel] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(ingredientId, amount);
    };
    
    //load options for ingredient select
    useEffect(() => {
        let isFirstOption = true;
        const recipeIngredientsId = props.recipeIngredients.map((recipeIngredient) => { return recipeIngredient.ingredient._id });

        setIngredientOptions(props.ingredientList.map((ingredient) => {
            if (!recipeIngredientsId.includes(ingredient._id)) {

                if(isFirstOption){
                    setIngredientId(ingredient._id);
                    isFirstOption = false;
                }
                return <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>;
            }
        }));


    }, [props.recipeIngredients, props.ingredientList]);

    //change of unit label according to chosen ingredient
    useEffect(() => {
        props.ingredientList.forEach((ingredient) => {
            if(ingredientId === ingredient._id){
                setUnitLabel(ingredient.units)
            }
        });
    }, [ingredientId]);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Ingredient:</InputGroup.Text>
                    <Form.Control
                        as="select"
                        id="Ingredient"
                        value={ingredientId}
                        title="Ingredient"
                        arial-label="Ingredient"
                        onChange={(e) => setIngredientId(e.target.value)}
                    >
                        {ingredientOptions}
                    </Form.Control>
                    <InputGroup.Text>Amount:</InputGroup.Text>
                    <Form.Control
                        type="number"
                        min="1"
                        id="Amount"
                        defaultValue="1"
                        title="Amount"
                        arial-label="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <InputGroup.Text>{unitLabel}</InputGroup.Text>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </InputGroup>
            </Form>
        </>
    );
};

export default IngredientForm;