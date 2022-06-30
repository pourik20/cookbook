import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const InstructionsForm = (props) => {
    const [instruction, setInstruction] = useState("");
    const [validation, setValidation] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(instruction.length !== 0){
            setValidation(true)
            props.onSubmit(instruction);
        }else{
            setValidation(false);
        }
        setInstruction("");
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Step:</InputGroup.Text>
                    <Form.Control
                        type="text"
                        id="Step"
                        title="Step"
                        arial-label="Step"
                        onChange={(e) => setInstruction(e.target.value)}
                        value={instruction}
                    />
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </InputGroup>
                {!validation && <p className="text-danger">Instruction can't be empty.</p>}
            </Form>
        </>
    );
};

export default InstructionsForm;