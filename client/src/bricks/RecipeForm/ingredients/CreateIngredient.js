import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import units from '../../../storage/units.js';

const CreateIngredient = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [unit, setUnit] = useState(units[0]);
    const [validation, setValidation] = useState(true);

    function handleSubmit() {
        if (name.length !== 0) {
            setValidation(true)
            fetch("/ingredient/create", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    "name": name,
                    "units": unit
                })
            }).then(response => {
                if (response.ok) {
                    setOpen(false);
                    setName("");
                    setUnit(units[0])
                    props.setLoadIngredients(true);
                }
            })
        } else {
            setValidation(false);
        }
    };

    return (
        <>
            <div className="d-grid gap-2">
                <Button variant="secondary" onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}>
                    Create Ingredient
                </Button>
            </div>
            <Collapse in={open}>
                <Container>
                    <Form>
                        <InputGroup className="my-3">
                            <InputGroup.Text>Name:</InputGroup.Text>
                            <Form.Control
                                type="text"
                                id="Ingredient"
                                value={name}
                                title="Ingredient"
                                arial-label="Ingredient"
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </InputGroup>
                        {!validation && <p className="text-danger">Ingredient can't be empty.</p>}
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Units:</InputGroup.Text>
                            <Form.Control
                                as="select"
                                id="Units"
                                title="Units"
                                arial-label="Units"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                {units.map((unit, i) => {
                                    return (
                                        <option key={i} value={unit}>
                                            {unit}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </InputGroup>
                        <div className="d-grid gap-2">
                            <Button
                                variant='success'
                                onClick={() => handleSubmit()}
                            >
                                Create
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Collapse>
        </>
    );
};

export default CreateIngredient;