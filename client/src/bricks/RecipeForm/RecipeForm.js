import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import BasicInfoForm from './basicInfo/BasicInfoForm';
import InstructionsForm from './instructions/InstructionsForm';
import InstructionItem from './instructions/InstructionItem';
import IngredientForm from './ingredients/IngredientForm';
import IngredientItem from './ingredients/IngredientItem';
import CategoryForm from './categories/CategoryForm';
import CategoryItem from './categories/CategoryItem';
import CreateIngredient from './ingredients/CreateIngredient';

const RecipeForm = (props) => {
    const [basicInfo, setBasicInfo] = useState();
    const [loadIngredients, setLoadIngredients] = useState(false);
    const [ingredientList, setIngredientList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    //set initial data for create form
    const [recipe, setRecipe] = useState({ name: "", description: "", prepLength: 1, categoryList: [], text: [], ingredientList: [] });
    const [recipeCategories, setRecipeCategories] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);

    //validation
    const [validationCategories, setValidationCategories] = useState(true);
    const [validationIngredients, setValidationIngredients] = useState(true);
    const [validationInstructions, setValidationInstructions] = useState(true);
    const [isValid, setIsValid] = useState(false);

    //set initial data for update form
    useEffect(() => {
        if (props.isUpdate) {
            setRecipe(props.recipe);
            setRecipeIngredients(props.recipe.ingredientList);
            setRecipeCategories(props.recipe.categoryList);
            setRecipeInstructions(props.recipe.text[0]);
        }

        //load categories data
        fetch('/category/list')
            .then(response => response.json())
            .then(data => setCategoryList(data))
    }, [])

    //load ingredients
    useEffect(() => {
        //load ingredients data
        fetch('/ingredient/list')
            .then(response => response.json())
            .then(data => {
                setIngredientList(data);
                setLoadIngredients(false);
            });

    }, [loadIngredients])

    //validation
    function handleSubmit(name, description, prepLength) {
        //prepare basic info data
        let dataBasicInfo = { name: name, description: description, prepLength: prepLength };
        setBasicInfo(dataBasicInfo);

        //validation
        let valid = true;

        //ingredients
        if (recipeIngredients.length === 0) {
            setValidationIngredients(false);
            valid = false;
        } else {
            setValidationIngredients(true);
        }

        //categories
        if (recipeCategories.length === 0) {
            setValidationCategories(false);
            valid = false;
        } else {
            setValidationCategories(true);
        }

        //instructions
        if (recipeInstructions.length === 0) {
            setValidationInstructions(false);
            valid = false;
        } else {
            setValidationInstructions(true);
        }

        //basicInfo
        if (!(valid && name.length > 0 && name.length < 255 && description.length > 0 && description.length < 8000)) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }

    //send data
    useEffect(() => {
        //prepare ingredients for fetch
        const sendIngredients = recipeIngredients.map(ingredient => {
            return { "ingredient": ingredient.ingredient._id, "amount": ingredient.amount }
        });

        //prepare categories for fetch
        const sendCategories = recipeCategories.map(category => {
            return category._id
        });

        //send data
        if (isValid) {
            if (props.isUpdate) {
                console.log("ahoj")
                //update recipe
                fetch("recipe/update", {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        "id": props.recipeId,
                        "name": basicInfo.name,
                        "description": basicInfo.description,
                        "prepLength": parseInt(basicInfo.prepLength),
                        "categoryList": sendCategories,
                        "text": recipeInstructions,
                        "ingredientList": sendIngredients
                    })
                }).then(response => {
                    if (response.ok) {
                        window.location.reload();
                        setIsValid(false);
                    }
                })
            } else {
                //create recipe
                fetch("/recipe/create", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        "name": basicInfo.name,
                        "description": basicInfo.description,
                        "prepLength": parseInt(basicInfo.prepLength),
                        "categoryList": sendCategories,
                        "text": recipeInstructions,
                        "ingredientList": sendIngredients
                    })
                }).then(response => {
                    if (response.ok) {
                        window.location.href = "/";
                        setIsValid(false);
                    }
                })
            }
        }

    }, [isValid])

    //categories
    function addCategory(categoryId) {
        categoryList.forEach((category) => {
            if (category._id === categoryId) {
                setRecipeCategories([...recipeCategories, category]);
            }
        });
    }

    function removeCategory(id) {
        const newCategories = []

        recipeCategories.forEach((category) => {
            if (id !== category._id) {
                newCategories.push(category);
            }
        });

        setRecipeCategories(newCategories);
    }

    //ingredients
    function addIngredient(ingredientId, ingredientAmount) {
        const newIngredient = { ingredient: {}, amount: ingredientAmount }

        ingredientList.forEach((ingredient) => {
            if (ingredient._id === ingredientId) {
                newIngredient.ingredient = ingredient;
                setRecipeIngredients([...recipeIngredients, newIngredient]);
            }
        });
    }

    function removeIngredient(id) {
        const newIngredients = []

        recipeIngredients.forEach((ingredient) => {
            if (id !== ingredient.ingredient._id) {
                newIngredients.push(ingredient);
            }
        });

        setRecipeIngredients(newIngredients);
    }

    function updateIngredient(id, ingredientAmount) {
        const newIngredients = [...recipeIngredients];

        recipeIngredients.forEach((ingredient) => {
            if (id === ingredient.ingredient._id) {
                ingredient.amount = ingredientAmount;
            }
        });
        setRecipeIngredients(newIngredients);
    }

    //instructions
    function addInstruction(instruction) {
        setRecipeInstructions([...recipeInstructions, instruction]);
    }

    function updateInstruction(id, newInstruction) {
        const newInstructions = [...recipeInstructions];
        newInstructions[id] = newInstruction;
        setRecipeInstructions(newInstructions);
    }

    function removeInstruction(id) {
        const newInstructions = [...recipeInstructions];
        newInstructions.splice(id, 1);
        setRecipeInstructions(newInstructions);
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} centered fullscreen>
                <Modal.Header closeButton>
                    {props.isUpdate && <Modal.Title>Update recipe</Modal.Title>}
                    {!props.isUpdate && <Modal.Title>Create recipe</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <BasicInfoForm recipe={recipe} onSubmit={handleSubmit} />
                        <h2>Categories:</h2>
                        <CategoryItem recipeCategories={recipeCategories} removeCategory={removeCategory} />
                        <CategoryForm onSubmit={addCategory} categoryList={categoryList} recipeCategories={recipeCategories} />
                        {!validationCategories && <p className="text-danger">At least one category must be added.</p>}
                        <h2>Ingredients:</h2>
                        <IngredientItem recipeIngredients={recipeIngredients} removeIngredient={removeIngredient} updateIngredient={updateIngredient} />
                        <IngredientForm onSubmit={addIngredient} recipeIngredients={recipeIngredients} ingredientList={ingredientList} />
                        <CreateIngredient setLoadIngredients={setLoadIngredients} />
                        {!validationIngredients && <p className="text-danger">At least one ingredient must be added.</p>}
                        <h2>Instructions:</h2>
                        <InstructionItem instructions={recipeInstructions} updateInstruction={updateInstruction} removeInstruction={removeInstruction} />
                        <InstructionsForm onSubmit={addInstruction} />
                        {!validationInstructions && <p className="text-danger">At least one instruction must be added.</p>}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    {props.isUpdate && <Button variant="danger" className="mx-auto" type="submit" form="basicInfoForm">
                        Update
                    </Button>
                    }
                    {!props.isUpdate && <Button variant="danger" className="mx-auto" type="submit" form="basicInfoForm">
                        Create
                    </Button>
                    }
                    <Button variant="secondary" onClick={props.onHide} className="mx-auto">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RecipeForm;