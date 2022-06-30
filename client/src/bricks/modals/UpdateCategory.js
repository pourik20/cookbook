import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function UpdateCategory(props) {
    const [formData, setFormData] = useState({})

    return (
        <Modal show={props.formShow} onHide={() => props.setFormShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='formCategoryName'>
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
