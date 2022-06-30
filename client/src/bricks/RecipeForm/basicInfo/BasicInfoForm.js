import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const BasicInfoForm = (props) => {
    const [name, setName] = useState(props.recipe.name);
    const [description, setDescription] = useState(props.recipe.description);
    const [prepLength, setPrepLength] = useState(props.recipe.prepLength);

    //validation
    const [validationName, setValidationName] = useState(true);
    const [validationDescription, setValidationDescription] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        //validation
        if (name.length === 0 || name.length > 255) {
            setValidationName(false);
        } else {
            setValidationName(true);
        }

        if (description.length === 0 || description.length > 8000) {
            setValidationDescription(false);
        } else {
            setValidationDescription(true);
        }

        props.onSubmit(name, description, prepLength);
    };

    return (
        <>
            <Form id="basicInfoForm" onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Name:</InputGroup.Text>
                    <Form.Control
                        type="text"
                        id="Name"
                        defaultValue={props.recipe.name}
                        title="Name"
                        arial-label="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>
                {!validationName && <p className="text-danger">Name must have 1 to 255 chars.</p>}
                <InputGroup className="mb-3">
                    <InputGroup.Text>Author:</InputGroup.Text>
                    <Form.Control
                        type="text"
                        id="Author"
                        defaultValue="User123"
                        title="Author"
                        arial-label="Author"
                        disabled
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Description:</InputGroup.Text>
                    <Form.Control
                        as="textarea"
                        id="Description"
                        defaultValue={props.recipe.description}
                        title="Description"
                        arial-label="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </InputGroup>
                {!validationDescription && <p className="text-danger">Description must be 1 to 8000 chars long.</p>}
                <InputGroup className="mb-3">
                    <InputGroup.Text>Preparation length (min):</InputGroup.Text>
                    <Form.Control
                        type="number"
                        min="1"
                        id="PreparationLength"
                        defaultValue={props.recipe.prepLength}
                        title="PreparationLength"
                        arial-label="Preparation length"
                        onChange={(e) => setPrepLength(e.target.value)}
                    />
                </InputGroup>
            </Form>
        </>
    );
};

export default BasicInfoForm;