import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Icon from '@mdi/react';
import { mdiConsole, mdiDelete } from '@mdi/js';

const CategoryItem = (props) => {

    return  props.recipeCategories.map((category, id) => (
        <div key={category._id}>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>{id + 1}</InputGroup.Text>
                <Form.Control
                    type="text"
                    id={category._id}
                    defaultValue={category.name}
                    title={`Step ${id}`}
                    arial-label={`Step ${id}`}
                    disabled
                />
                <Button variant="danger" >
                    <Icon path={mdiDelete} title="Delete" size={1} onClick={() => props.removeCategory(category._id)}/>
                </Button>
            </InputGroup>
        </div>
    ));
};

export default CategoryItem;