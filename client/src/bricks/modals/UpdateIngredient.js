import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function UpdateIngredient(props) {
    const [formData, setFormData] = useState({})

    return (
        <Modal show={props.formShow} onHide={() => props.setFormShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Ingredient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='formIngredientName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return { ...prev, name: e.target.value }
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formIngredientUnit'>
                        <Form.Label>Unit</Form.Label>
                        <Form.Select
                            onChange={(e) =>
                                setFormData((prev) => {
                                    return { ...prev, units: e.target.value }
                                })
                            }
                        >
                            <option value=''>Choose unit</option>
                            {props.units.map((unit, i) => {
                                return (
                                    <option key={i} value={unit}>
                                        {unit}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='primary'
                    onClick={() => props.handleSubmit(formData)}
                >
                    Update
                </Button>
                <Button
                    variant='secondary'
                    onClick={() => props.setFormShow(false)}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
