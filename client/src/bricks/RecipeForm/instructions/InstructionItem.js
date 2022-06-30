import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { mdiPencil } from '@mdi/js';

const InstructionItem = (props) => {
    return  props.instructions.map((instruction, id) => (
        <div key={id}>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Step {id + 1}</InputGroup.Text>
                <Form.Control
                    type="text"
                    id={id}                   
                    value={instruction}
                    title={id}
                    arial-label={id}
                    onChange={(e) => props.updateInstruction(id, e.target.value)}
                />
                <Button variant="danger" onClick={() => props.removeInstruction(id)}>
                    <Icon path={mdiDelete} title="Delete" size={1} />
                </Button>
            </InputGroup>
        </div>
    ));
};

export default InstructionItem;